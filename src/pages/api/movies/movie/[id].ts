import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {

    const {method, query} = req;

    const id=query.id;
  try {
    const movieResponse = await axios.get(`https://ghibliapi.vercel.app/films/${id}`)
    const movieData = movieResponse.data

    const peopleDetails = await Promise.all(
      movieData.people.map(async (personUrl:any) => {
        try {
          const personResponse = await axios.get(personUrl);
          return personResponse.data;
        } catch (error) {
          console.error('Error fetching person data:', error);
          return null;
        }
      })
    );
    const movieWithPeople = { ...movieData, people: peopleDetails };

    res.status(200).json(movieWithPeople);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
