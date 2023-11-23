import axios from 'axios';
import cheerio from 'cheerio';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req;
  const movieName = query.title;

  try {
    // Fetch data from the Ghibli Fandom website using Cheerio
    const response = await axios.get(`https://ghibli.fandom.com/wiki/${movieName}`);
    const html = response.data;
  
    // Load the HTML content into Cheerio
    const $ = cheerio.load(html);

    // Find all <a> elements inside <dl> elements within <dt> elements
    const targetLinks = $('dl > dt > a');

    const ghibliNameLinks: any[] = [];

    // Extract href and title attributes of each matched <a> element
    targetLinks.each((index, element) => {
      const href = $(element).attr('href');
      const title = $(element).attr('title');
      ghibliNameLinks.push({ url: href, title: title });
    });

    const ghibliImages = await Promise.all(
      ghibliNameLinks.map(async (link) => {
        try {
          const personUrl = await axios.get(`https://ghibli.fandom.com${link.url}`);
          const personUrlData = personUrl.data;
          const $1 = cheerio.load(personUrlData);
          const targetImages = $1('aside > figure > a > img');
          
          const images = targetImages.map((index, element2) => {
            return $1(element2).attr('src');
          }).get(); // Convert Cheerio collection to array

          return { title: link.title, images: images };
        } catch (error) {
          console.error('Error fetching person data:', error);
          return { title: link.title, images: [] }; // Provide an empty array for images in case of an error
        }
      })
    );

    // Send a response to the client
    res.status(200).json(ghibliImages);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
