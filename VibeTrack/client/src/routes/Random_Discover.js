import React, { useEffect, useState } from 'react';

function RandomDiscover() {
  const [venues, setVenues] = useState([]); // array of venues
  const [selectedVenues, setSelectedVenues] = useState([]); // array of venues to be sent

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
    else {
      // Add the new venue to the list
      setSelectedVenues([...selectedVenues, clickedVenue]);
    }
  };

  // Function to get 3 random venues
  const getRandomVenues = () => {
    const shuffledVenues = [...venues]; // Create a copy of the venues array
    for (let i = shuffledVenues.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledVenues[i], shuffledVenues[j]] = [shuffledVenues[j], shuffledVenues[i]];
    }
    return shuffledVenues.slice(0, 3); // Get the first 3 shuffled venues
  };

  const randomVenues = getRandomVenues();

  return (
    <div>
      <h1>Selected Venues</h1>
      <ul>
        {selectedVenues.map((venue, index) => (
          <li key={index}>{venue}</li>
        ))}
      </ul>
      <ul style={{ color: '#000' }}>
        {randomVenues.map((venue, index) => (
          <li key={index} onClick={() => handleClickedVenue(venue.name)}>
            {venue.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RandomDiscover;
