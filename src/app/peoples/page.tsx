"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';


function allPeoples() {
  const [peoplesInfo, setpeoplesInfo] = useState<any[] | null>(null);

  useEffect(() => {
    // Fetch Studio Ghibli item details
    const fetchMovie = async () => {
      try {
        const response = await axios.get('/api/peoples/getPeoples');
        setpeoplesInfo(response.data);
      } catch (error) {
        console.error('Error fetching movie info:', error);
      }
    };

    fetchMovie();
  }, []);


{}
  return (
    <div>
      <h2>Listes des films</h2>
      {peoplesInfo && peoplesInfo.map((people: any, key: React.Key) => (
        <li key={key}>
          <h2>{people.name}</h2>
            <Link href={`/peoples/${people.id}`}>
            Consulter les details du personnage
          </Link>
          {people.gender !=="N A" && <p>{people.gender}</p> }
         {people.films.title}
          <ul></ul>
        </li>
      ))
      }
    </div>
  );
}

export default allPeoples;
