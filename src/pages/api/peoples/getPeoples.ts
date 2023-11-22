import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

// Cache variable to store the fetched data
let cachedPeopleWithFilms: any[] = [];

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Check if data is already in the cache
    if (cachedPeopleWithFilms.length > 0) {
      console.log('Using cached data');
      res.status(200).json(cachedPeopleWithFilms);
      return;
    }

    // If not in the cache, fetch the data
    const peoplesResponse = await axios.get('https://ghibliapi.dev/people');
    const peoplesMovies = peoplesResponse.data;
    const peopleWithFilms: any[] = [];

    await Promise.all(
      peoplesMovies.map(async (people: any) => {
        try {
          const peopleMovie = await axios.get(people.films);
          peopleWithFilms.push({ ...people, films: peopleMovie.data });
        } catch (error) {
          console.error('Error fetching people film data: ', error);
          return null;
        }
      })
    );

    // Update the cache with the new data
    cachedPeopleWithFilms = peopleWithFilms;

    res.status(200).json(peopleWithFilms);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
