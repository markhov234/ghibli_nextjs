// Import necessary libraries/modules
import axios from 'axios';
import cheerio from 'cheerio';
import { NextApiRequest, NextApiResponse } from 'next';

// Define the structure of ImageData
interface ImageData {
  src: string;
  alt: string;
}

// Define the API route handler
export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Extract HTTP method and query parameters from the request
  const { method, query } = req;
  const id = query.id;

  try {
    // Step 1: Fetch movie data from the Ghibli API
    const movieResponse = await axios.get(`https://ghibliapi.vercel.app/films/${id}`);
    const movieData = movieResponse.data;
   
    // Step 2: Fetch details for each person associated with the movie
    const peopleDetails = await Promise.all(
      movieData.people.map(async (personUrl: any) => {
        try {
          // Fetch information for each person from their respective URLs
          const personResponse = await axios.get(personUrl);
          return personResponse.data;
        } catch (error) {
          // Log an error if fetching person data fails
          console.error('Error fetching person data:', error);
          return null;
        }
      })
    );

    // Step 3: Combine movie data with details of associated people
    const movieWithPeople = { ...movieData, people: peopleDetails };

    // Step 4: Respond with the combined data
    res.status(200).json(movieWithPeople);
  } catch (error) {
    // Log an error and respond with a 500 Internal Server Error in case of failure
    console.error('Error fetching movie data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
