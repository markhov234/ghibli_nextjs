"use client"
import axios from "axios";
import { Key, useEffect, useState } from "react";

interface MovieProps {
  params: any;
}

interface MovieInfo {
  id: string;
  title: string;
  image: string;
  description:string;
  original_title:string;
  director:string;
  movie_banner:string;
  people:any;
  // Add other properties as needed
}

interface ImageInfo {
  title: string;
  images: string;
}
// ... (imports)

function MovieDetails({ params }: MovieProps) {
  const [movieInfo, setMovieInfo] = useState<MovieInfo | null>(null);
  const [imageInfo, setImageInfo] = useState<ImageInfo[]>([]);
  const { movie } = params;

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        // Step 1: Fetch movie information
        const response = await axios.get(`/api/movies/movie/${movie}`);
        const fetchedMovieInfo = response.data;
        setMovieInfo(fetchedMovieInfo);

        // Step 2: Call Wikipedia API using movieInfo.title
        const wikiMovieTitle = fetchedMovieInfo.title.split(' ').join('_');
        const wikipediaResponse = await axios.get(`/api/wikipedia/${encodeURIComponent(fetchedMovieInfo.title)}`);
        const wikipediaData = wikipediaResponse.data;
        setImageInfo(wikipediaData);
      } catch (error) {
        console.error('Error fetching movie info:', error);
      }
    };

    fetchMovie();
  }, [movie]);

  if (!movieInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <h2>{movieInfo.title}</h2>
        <h3>{movieInfo.original_title}</h3>
        <p>{movieInfo.description}</p>
        <p>{movieInfo.director}</p>

        <img src={movieInfo.image} alt={movieInfo.title} />
        <img src={movieInfo.movie_banner} alt={movieInfo.title} />

        {movieInfo.people.map((individual: any, key: Key) => (
          <ul key={key}>
            <li>{individual.name}</li>
            {individual.gender !== "NA" && <li><span> Gender: {individual.gender}</span></li>}
            {individual.age && <li><span>Age: {individual.age}</span></li>}

            {imageInfo.map((image: ImageInfo, imageKey: React.Key) => (
             individual.name && individual.name.toLowerCase().includes(image.title.toLowerCase()) && (
                <li key={imageKey}>
                  <img src={image.images[0]} />
                  
                  </li>
              )
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export default MovieDetails;