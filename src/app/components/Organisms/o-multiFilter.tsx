import React, { useEffect, useState } from "react";

interface DataItem {
  films: {
    title: string;
    // Add other properties as needed
  };
  // Add other properties as needed
}

interface MultiFiltersProps {
  data: DataItem[];
  onUpdatePeoplesInfo: (info: any) => void;
}

const MultiFilters: React.FC<MultiFiltersProps> = ({
  data,
  onUpdatePeoplesInfo,
}) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [filteredItems, setFilteredItems] = useState<DataItem[]>(data);

  const menuFilters: string[] = [
    ...new Set(data.map((val) => val.films.title)),
  ];

  const handleFilterChange = (filter: string) => {
    setSelectedFilters((prevFilters) => {
      const updatedFilters = prevFilters.includes(filter)
        ? prevFilters.filter((el) => el !== filter)
        : [...prevFilters, filter];

      return updatedFilters;
    });
  };

  useEffect(() => {
    const filterItems = () => {
      if (selectedFilters.length > 0) {
        const updatedItems = data.filter((item) =>
          selectedFilters.includes(item.films.title)
        );
        setFilteredItems(updatedItems);
      } else {
        setFilteredItems(data);
      }
    };

    filterItems();
  }, [selectedFilters, data]);

  useEffect(() => {
    onUpdatePeoplesInfo(filteredItems);
  }, [filteredItems, onUpdatePeoplesInfo]);

  return (
    <div>
      <h2>Movie Filters</h2>
      <div>
        {menuFilters.map((filter: any, key: React.Key) => (
          <button
            key={key}
            type="button"
            value={filter}
            onClick={() => handleFilterChange(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MultiFilters;
