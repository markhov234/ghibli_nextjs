import React, {useEffect, useState} from "react"


interface DataItem {
    films: {
      title: string;
      // Add other properties as needed
    };
    // Add other properties as needed
  }
  
export default function MultiFilters(movies:any){
    const [selectedFilters, setSelectedFilters]  = useState([])
    const [filteredItems, setFilteredItems]  = useState([])

    const menuFilters = [...new Set(movies.data.map((val:any)=>val.films.title))]

    // movies.data.map((item:any)=>{
    //     console.log(item)
    // })
    console.log(menuFilters)

    return <div></div>
}