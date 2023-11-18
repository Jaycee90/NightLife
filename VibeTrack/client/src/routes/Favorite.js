import React, { useState, useEffect } from 'react';
import '../css/favorites.css';

function Favorites() {
  const [venues, setVenues] = useState([]); // array of venue objects
  const [selectedVenues, setSelectedVenues] = useState([]); // array of venues to be sent
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false); // state to toggle favorites display
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

  const toggleFavoritesDisplay = () => {
    setShowFavoritesOnly(!showFavoritesOnly); // Toggle the state
  };

  const addToFavorites = (venue) => {
    if (!selectedVenues.includes(venue.name)) {
      setSelectedVenues([...selectedVenues, venue.name]);
      setFavoriteVenues([...favoriteVenues, venue.name]);
    }
  };

  const removeFromFavorites = (venue) => {
    setSelectedVenues(selectedVenues.filter((v) => v !== venue));
  };

  return (
    <div className="favorite-container">
      <div className="left-content">
        <h1>Selected Venues</h1>
        <ul>
          {selectedVenues.map((venue, index) => (
            <li key={index} style={{ color: 'blue' }}>
              {venue}
              <div style={{ background: 'blue', display: 'inline-block', padding: '5px', margin: '5px' }}>
                <button onClick={() => removeFromFavorites(venue)} style={{ background: 'transparent', border: 'none', color: 'white' }}>
                  Remove from Favorites
                </button>
              </div>
            </li>
          ))}
        </ul>

        <ul style={{ color: '#000' }}>
          {showFavoritesOnly
            ? selectedVenues.map((venue, index) => (
                <li key={index} style={{ color: 'blue' }}>
                  <div style={{ background: 'black', color: 'white', padding: '5px', margin: '5px' }}>
                    {venue}
                    <div style={{ background: 'blue', display: 'inline-block', padding: '5px', margin: '5px' }}>
                      <button onClick={() => removeFromFavorites(venue)} style={{ background: 'transparent', border: 'none', color: 'white' }}>
                        Remove from Favorites
                      </button>
                    </div>
                  </div>
                </li>
              ))
            : venues.map((venue, index) => (
                <li key={index} style={{ color: 'blue' }}>
                  <div style={{ background: 'black', color: 'white', padding: '5px', margin: '5px' }}>
                    {venue.name}
                    <div style={{ background: 'blue', display: 'inline-block', padding: '5px', margin: '5px' }}>
                      <button onClick={() => addToFavorites(venue)} style={{ background: 'transparent', border: 'none', color: 'white' }}>
                        Add to Favorites
                      </button>
                    </div>
                  </div>
                </li>
              ))
          }
        </ul>
      </div>

      <div className="right-content">
        <button onClick={toggleFavoritesDisplay}>
          {showFavoritesOnly ? 'Show All Venues' : 'Show Favorites Only'}
        </button>
      </div>
    </div>
  );
}

export default Favorites;
