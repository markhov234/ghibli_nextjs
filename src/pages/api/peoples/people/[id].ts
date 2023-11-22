import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async(req:NextApiRequest, res:NextApiResponse) =>{
    const {method, query} =req;

    const id= query.id;

    try{
        const peopleRespond = await axios.get(`https://ghibliapi.vercel.app/people/${id}`)
        const peopleData = peopleRespond.data;
        
        const peopleMovies = await Promise.all(
            peopleData.films.map(async (film:any)=>{
                try{
                    const peopleFilm = await axios.get(film);
                    return peopleFilm.data;
                }
                catch (error){
                    console.error('Error fectching data for PeopleFilm', error);
                    return null
                }
            })

        )

        const peopleWithMovie = {...peopleData, films:peopleMovies};
        res.status(200).json(peopleWithMovie);

    } catch(error){
        res.status(500).json({ error: 'Internal Server Error' });

    }

}