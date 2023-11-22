import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

// Cache variable to store the fetched data
let cachedAllFilms: any[] = [];

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {

   // Check if data is already in the cache
   if (cachedAllFilms.length > 0) {
    console.log('Using cached data');
    res.status(200).json(cachedAllFilms);
    return;
  }

    const response = await axios.get('https://ghibliapi.vercel.app/films');  // Find All Movies
    cachedAllFilms = response.data;
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
