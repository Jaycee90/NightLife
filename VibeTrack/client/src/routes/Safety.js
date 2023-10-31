import React, { useEffect, useState } from 'react';

function Safety() {
  const [venues, setVenues] = useState([]); // array of venues
  const [selectedVenues, setSelectedVenues] = useState([]); // array of venues to be sent
  // Data for emails to be sent to emergency contact
  const [emailData, setEmailData] = useState({
    to: '',
    subject: 'Heres a list of clubs I am visiting tonight',
    text: '',
  });
  
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

  const handleInputChange = (e) => {
    // Update target fields - "to"
    const { name, value } = e.target;
    setEmailData({ 
      ...emailData, 
      [name]: value 
    });
  };

  const sendEmail = () => {
    console.log('sendEmail function called');
    // Create message with selected venues attached
    const messageWithSelectedVenues = `Selected Venues:\n${selectedVenues.join('\n')}`
    const emailDataWithVenues = {
      ...emailData,
      text: messageWithSelectedVenues, // Append selected venues to text
    };
    fetch('http://localhost:5050/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailDataWithVenues),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log('Email sent:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleClickedVenue = (clickedVenue) => {
    if (selectedVenues.includes(clickedVenue)) return;
    else {
      // Add the new venue that to the list
      setSelectedVenues([...selectedVenues, clickedVenue]);
    }
  }

  return (
    <div>
      <h1>Selected Venues</h1> 
      <ul>
      {selectedVenues.map((venue, index) => (
        <li key={index}>
          {venue}
        </li>
      ))}
      </ul>
      <input
        type="email"
        name="to"
        placeholder="Recipient"
        value={emailData.to}
        onChange={handleInputChange}
      />
      <button onClick={sendEmail}>Send Email</button>
      <ul style={{color:'#000'}}>
        {venues.map((venue, index) => (
          <li key={index} onClick={() => handleClickedVenue(venue.name)}>
            {venue.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Safety;