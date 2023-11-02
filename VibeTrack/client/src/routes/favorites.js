import React, { useState, useEffect } from 'react';

function Favorites() {
  const [venues, setVenues] = useState([]); // array of venue objects
  const [selectedVenues, setSelectedVenues] = useState([]); // array of venues to be sent
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false); // new state for toggling favorites
  const [confirmationVenue, setConfirmationVenue] = useState(null); // confirmation state
  const [favoriteVenues, setFavoriteVenues] = useState([]);

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

  // Function to add the current venue to favorites
  const addToFavorites = (venue) => {
    if (!selectedVenues.includes(venue.name)) {
      setSelectedVenues([...selectedVenues, venue.name]);
  
      // Add the venue to the favorites
      setFavoriteVenues([...favoriteVenues, venue.name]);
    }
  };
  

  const requestRemoveConfirmation = (venue) => {
    setConfirmationVenue(venue);
  };

  const cancelRemoveConfirmation = () => {
    setConfirmationVenue(null);
  };

  const confirmRemoveFromFavorites = (venue) => {
    setSelectedVenues(selectedVenues.filter((v) => v !== venue));
    setConfirmationVenue(null); // Clear the confirmation
  };

  return (
    <div>
      <h1>Selected Venues</h1>
      <ul>
        {selectedVenues.map((venue, index) => (
          <li key={index} style={{ color: 'blue' }}>
            {venue}
            <button onClick={() => requestRemoveConfirmation(venue)}>
              Remove from Favorites
            </button>
          </li>
        ))}
      </ul>
  
      {confirmationVenue && (
        <div>
          <p>Are you sure you want to remove {confirmationVenue} from favorites?</p>
          <button onClick={() => confirmRemoveFromFavorites(confirmationVenue)}>
            Yes
          </button>
          <button onClick={cancelRemoveConfirmation}>No</button>
        </div>
      )}
  
      <button onClick={toggleFavoritesDisplay}>
        {showFavoritesOnly ? 'Show All Venues' : 'Show Favorites Only'}
      </button>
  
      <ul style={{ color: '#000' }}>
        {venues.map((venue, index) => (
          <li key={index} style={{ color: 'blue' }}>
            {venue.name}
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

// at a stopping point