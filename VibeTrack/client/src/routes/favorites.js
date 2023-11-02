import React, { useState, useEffect } from 'react';

function Favorites() {
  const [venues, setVenues] = useState({ name: "" });

  useEffect(() => {
    // Call the function to fetch and set venues
    fetchAndSetVenues();
  }, []);

  const fetchAndSetVenues = async () => {
    try {
      const response = await fetch(`http://localhost:5050/record/`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const venueData = await response.json();
      setVenues({ name: venueData });
    } catch (error) {
      console.log('Error fetching venues from the database, ', error);
    }
  };

  return (
    <div>
      <h1>Selected Venues</h1>
      {/* Render venue names here using venues.name */}
      {venues.name && (
        <ul style={{ color: 'blue' }}>
          {venues.name.map((venueName, index) => (
            <li key={index}>{venueName}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Favorites;
