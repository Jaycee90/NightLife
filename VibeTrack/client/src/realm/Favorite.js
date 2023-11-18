import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import '../css/favorites.css';

function Favorite() {
  const [venues, setVenues] = useState([]); 
  const [selectedVenues, setSelectedVenues] = useState([]); 
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(true);
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
        
      // Add "VibeTrack" to the selectedVenues initially
      setSelectedVenues((prevSelectedVenues) => {
        if (!prevSelectedVenues.includes("VibeTrack")) {
          return ["VibeTrack", ...prevSelectedVenues];
        }
        return prevSelectedVenues;
      });

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
        <ul>W
          {selectedVenues.map((venue, index) => (
            <li key={index} style={{ color: 'blue' }}>
              {venue}
              <div style={{ display: 'inline-block', padding: '5px', margin: '5px' }}>
                <FontAwesomeIcon icon={faHeart} onClick={() => removeFromFavorites(venue)} style={{ cursor: 'pointer' }} />
              </div>
            </li>
          ))}
        </ul>

        <ul style={{ color: '#000' }}>
          {showFavoritesOnly
            ? selectedVenues.map((venue, index) => (
                <li key={index} style={{}}>
                  <div style={{ background: 'black', color: 'white', padding: '5px', margin: '5px' }}>
                    {venue}
                    <div style={{display: 'inline-block', padding: '5px', margin: '5px' }}>
                      <FontAwesomeIcon icon={faHeart} onClick={() => removeFromFavorites(venue)} style={{ cursor: 'pointer' }} />
                    </div>
                  </div>
                </li>
              ))
            : venues.map((venue, index) => (
                <li key={index} style={{}}>
                  <div style={{ background: 'black', color: 'white', padding: '5px', margin: '5px' }}>
                    {venue.name}
                    <div style={{ display: 'inline-block', padding: '5px', margin: '5px' }}>
                      <FontAwesomeIcon icon={faHeart} onClick={() => addToFavorites(venue)} style={{ cursor: 'pointer' }} />
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

export default Favorite;
