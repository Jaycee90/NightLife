import React, { useEffect, useState } from 'react';

function Favorites() {
  const [venues, setVenues] = useState([]); // array of venue names
  const [selectedVenues, setSelectedVenues] = useState([]); // array of venues to be sent
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false); // new state for toggling favorites


  useEffect(() => {
    // Retreive all of teh venues
    const getVenues = async () => {
      try {
        const response = await fetch(`http://localhost:5050/record/`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const venueData = await response.json();
      setVenues(venueData);
      } catch (error) {
        console.log('Error fetching venues from database, ', error);
      }
    };
    getVenues();
  }, []);

  const handleClickedVenue = (clickedVenue) => {
    if (selectedVenues.includes(clickedVenue)) return;
    else {
      // Add the new venue to the list
      setSelectedVenues([...selectedVenues, clickedVenue]);
    }
  };

  const toggleFavoritesDisplay = () => {
    setShowFavoritesOnly(!showFavoritesOnly); // Toggle the state
  };

  return (
    <div>
      <h1>Selected Venues</h1>
      <ul>
        {selectedVenues.map((venue, index) => (
          <li key={index}>{venue}</li>
        ))}
      </ul>

      <button onClick={toggleFavoritesDisplay}>
        {showFavoritesOnly ? 'Show All Venues' : 'Show Favorites Only'}
      </button>

      <ul style={{ color: '#000' }}>
        {showFavoritesOnly
          ? selectedVenues.map((venue, index) => (
              <li key={index}>{venue}</li>
            ))
          : venues.map((venue, index) => (
              <li key={index} onClick={() => handleClickedVenue(venue)}>
                {venue}
              </li>
            ))}
      </ul>
    </div>
  );
}

export default Favorites;