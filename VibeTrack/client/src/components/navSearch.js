import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Fuse from 'fuse.js';
import { FaSearch } from "react-icons/fa";

const NavSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  // eslint-disable-next-line
  const [venueData, setVenueData] = useState(null);
  const navigate = useNavigate();

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
        // Find the result with the lowest score (most matched)
        const mostMatchedVenue = searchResults.reduce((prev, current) => {
          return prev.score < current.score ? prev : current;
        }).item;

        // Navigate to the page
        navigate(`/data/${mostMatchedVenue._id}`);
      } else {
        // Handle the case where no results are found
        window.alert('No results found.');
      }
    } catch (error) {
      window.alert(error.message);
    }
  };

  return (
    <div>
      {/* Add a form to input search query */}
      <form onSubmit={(e) => { e.preventDefault(); searchVenue(); }}>
        <input
          type="text"
          placeholder="Search for venues..."
          value={searchQuery}
          onChange={handleSearch}
          style={{ backgroundColor:"#fff" , color:'#747474', paddingBottom:'10px', marginTop:'0px', borderRadius:'10px'}}
          inputProps={{ style: { backgroundColor: "#fff", color:'#747474'} }}
        />
        <button type="submit" onClick={searchVenue}>
          <FaSearch style={{color:'#fff'}}/>
        </button>
      </form>
    </div>
  );
};

export default NavSearch;
