"use client"
import axios from "axios";
import { Key, useEffect, useState } from "react";

interface PeopleProps {
  params: any;
}

interface PeopleInfo {
  id: string;
  age: string;
  eye_color: string;
  films:any;
  gender:string;
  hair_color:string;
  name:string;
  // Add other properties as needed
}

function MovieDetails({ params }: PeopleProps) {
  const [peopleInfo, setpeopleInfo] = useState<PeopleInfo | null>(null);
  const { people } = params;

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`/api/peoples/people/${people}`);
        setpeopleInfo(response.data);
      } catch (error) {
        console.error('Error fetching movie info:', error);
      }
    };

    fetchMovie();
  }, [people]);

if(!peopleInfo){
  return <div>Loading...</div>;
}
  return (
    <div>
      <div>
        <h2>{peopleInfo.name}</h2>
        <h3>{peopleInfo.age}</h3>
        <p>{peopleInfo.gender}</p>
        <p>{peopleInfo.hair_color}</p>
        <ul>
        {peopleInfo && peopleInfo.films.map((filmInfo:any,key:React.Key)=>(
            <li key={key}>
              <p>{filmInfo.title}</p>
              <img src={filmInfo.image} />  
            </li>
         ))}
         </ul>
      </div>
    </div>
  );
}

export default MovieDetails;
