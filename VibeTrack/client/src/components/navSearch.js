import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Fuse from 'fuse.js';

const NavSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [foundVenueDetails, setFoundVenueDetails] = useState(null);
  
  const [venueData, setVenueData] = useState(null);

  useEffect(() => {
    async function getVenues() {
      try {
        const response = await fetch(`http://localhost:5050/record/`);

        if (!response.ok) {
          throw new Error(`An error occurred: ${response.statusText}`);
        }

        const venueData = await response.json();
        setVenueData(venueData);
      } catch (error) {
        window.alert(error.message);
      }
    }

    getVenues();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    return;
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const searchVenue = async () => {
    try {
      const response = await fetch(`http://localhost:5050/record/`);

      if (!response.ok) {
        throw new Error(`An error occurred: ${response.statusText}`);
      }

      const records = await response.json();

      const fuse = new Fuse(records, {
        keys: ['name'],
        includeScore: true,
        threshold: 0.3,
      });

      const searchResults = fuse.search(searchQuery);

      if (searchResults.length > 0) {
        const foundVenues = searchResults.map((result) => result.item);
        setFoundVenueDetails(foundVenues);
      } else {
        setFoundVenueDetails(null);
      }
    } catch (error) {
      window.alert(error.message);
    }
  };

  // This useEffect will trigger the search when the searchQuery changes
  useEffect(() => {
    searchVenue();
  }, [searchQuery]);

  return (
    <div>
      {/* Add a form to input search query */}
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Search for venues..."
          value={searchQuery}
          onChange={handleSearch}
            style={{ backgroundColor:"#fff" , color:'#747474', paddingBottom:'10px', marginTop:'0px', borderRadius:'10px'}}
            inputProps={{ style: { backgroundColor: "#fff", color:'#747474'} }}
        />
        <button type="submit" onClick={searchVenue}>
          Search
        </button>
      </form>

      {/* Display search results */}
      {foundVenueDetails &&
        foundVenueDetails.map((venueData) => (
          <div key={venueData._id}>
            <Link to={`/data/${venueData._id}`}>{venueData.name}</Link>
          </div>
        ))}
    </div>
  );
};

export default NavSearch;
