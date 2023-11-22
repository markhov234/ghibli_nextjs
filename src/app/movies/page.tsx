"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';


function OAllMovies() {
  const [movieInfo, setMovieInfo] = useState<any[] | null>(null);

  useEffect(() => {
    // Fetch Studio Ghibli item details
    const fetchMovie = async () => {
      try {
        const response = await axios.get('/api/movies/getAllMovies');
        setMovieInfo(response.data);
      } catch (error) {
        console.error('Error fetching movie info:', error);
      }
    };

    fetchMovie();
  }, []);

  return (
    <div>
      <h2>Listes des films</h2>
      {movieInfo && movieInfo.map((movie: any, key: React.Key) => (
        <li key={key}>
          <h2>{movie.title}</h2>
            <Link href={`/movies/${movie.id}`}>
            Consulter les details du film
            <img src={movie.image}/>
          </Link>
        </li>
      ))
      }
    </div>
  );
}

export default OAllMovies;
