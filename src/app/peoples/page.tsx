"use client";
// Import necessary dependencies
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import MultiFilters from "../components/Organisms/o-multiFilter";

// Define the functional component 'allPeoples'
function allPeoples() {
  // State to hold information about peoples (initialized as null)
  const [peoplesInfo, setpeoplesInfo] = useState<any[] | null>(
    null
  );
  const [filterTitle, setFilterTitle] = useState<any[] | null>(
    null
  );

  // useEffect hook runs once when the component mounts
  useEffect(() => {
    // Fetch Studio Ghibli people details from the '/api/peoples/getPeoples' endpoint
    const fetchPeople = async () => {
      try {
        // Step 1: Make an asynchronous request to the API endpoint
        const response = await axios.get(
          "/api/peoples/getPeoples"
        );

        // Step 2: Update the state with the fetched people information
        setpeoplesInfo(response.data);
        setFilterTitle(response.data);
      } catch (error) {
        // Handle errors if any occur during the API request
        console.error("Error fetching people info:", error);
      }
    };

    // Call the fetchPeople function when the component mounts (empty dependency array)
    fetchPeople();
  }, []);

const updatePeoplesInfo = (newData:any) =>{
  setpeoplesInfo(newData);
}

  // Render the component
  return (
    <div>
      {/* Display a heading */}
      <h2>Listes des films</h2>
      {filterTitle &&
      <MultiFilters data={filterTitle} onUpdatePeoplesInfo={updatePeoplesInfo}/>
}

      {peoplesInfo &&
        peoplesInfo.map((people: any, key: React.Key) => (
          <li key={key}>
            <h2>{people.name}</h2>

            <Link href={`/peoples/${people.id}`}>
              Consulter les details du personnage
            </Link>

            {people.gender !== "N A" && <p>{people.gender}</p>}

            <Link href={`/movies/${people.films.id}`}>
          {people.films.title}
          </Link>

            <ul></ul>
          </li>
        ))}
    </div>
  );
}
export default allPeoples;
