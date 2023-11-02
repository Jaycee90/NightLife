import React, { useState, useEffect } from 'react';

function Favorites() {
  const [venues, setVenues] = useState([]); // array of venue names
  const [selectedVenues, setSelectedVenues] = useState([]); // array of venues to be sent
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false); // new state for toggling favorites
  const [confirmationVenue, setConfirmationVenue] = useState(null); // venue for which confirmation is requested


  useEffect(() => {
    // Retrieve all of the venues
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
        console.log('Error fetching venues from the database, ', error);
      }
    };
    getVenues();
  }, []);

  const handleClickedVenue = (clickedVenue) => {
    if (selectedVenues.includes(clickedVenue)) return;
    setSelectedVenues([...selectedVenues, clickedVenue]);
  };

  const toggleFavoritesDisplay = () => {
    setShowFavoritesOnly(!showFavoritesOnly); // Toggle the state
  };

  const addToFavorites = (venue) => {
    if (!selectedVenues.includes(venue)) {
      setSelectedVenues([...selectedVenues, venue]);
    }
  };

  const removeFromFavorites = (venue) => {
    setSelectedVenues(selectedVenues.filter((v) => v !== venue));
  };

  return (
    <div>
      <h1>Selected Venues</h1>
      <ul>
        {selectedVenues.map((venue, index) => (
          <li key={index} style={{ color: 'blue' }}>
            {venue}
            <button onClick={() => removeFromFavorites(venue)}>
              Remove from Favorites
            </button>
          </li>
        ))}
      </ul>

      <button onClick={toggleFavoritesDisplay}>
        {showFavoritesOnly ? 'Show All Venues' : 'Show Favorites Only'}
      </button>

      <ul style={{ color: '#000' }}>
        {showFavoritesOnly
          ? selectedVenues.map((venue, index) => (
              <li key={index} style={{ color: 'blue' }}>
                {venue}
                <button onClick={() => removeFromFavorites(venue)}>
                  Remove from Favorites
                </button>
              </li>
            ))
          : venues.map((venue, index) => (
              <li key={index} style={{ color: 'blue' }}>
                {venue}
                <button onClick={() => addToFavorites(venue)}>
                  Add to Favorites
                </button>
              </li>
            ))}
      </ul>
    </div>
  );
}

export default Favorites;