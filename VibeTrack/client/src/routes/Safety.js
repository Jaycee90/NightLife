import React, { useEffect, useState } from 'react';
import '../css/safety.css';

function Safety() {
  const [venues, setVenues] = useState([]);
  const [selectedVenues, setSelectedVenues] = useState([]);
  const [emailData, setEmailData] = useState({
    to: '',
    subject: "Here's a list of clubs I am visiting tonight",
    text: '',
  });

  useEffect(() => {
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
        console.log('Error fetching venues from the database: ', error);
      }
    };
    getVenues();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmailData({
      ...emailData,
      [name]: value,
    });
  };

  const sendEmail = () => {
    const messageWithSelectedVenues = `Selected Venues:\n${selectedVenues.join('\n')}`;
    const emailDataWithVenues = {
      ...emailData,
      text: messageWithSelectedVenues,
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
      setSelectedVenues([...selectedVenues, clickedVenue]);
    }
  };

  return (
    <>
      <div className="intro-container"  style={{marginTop:"20px"}}>
        <h1 className="intro-title">Safety First!</h1>
        <p className="intro-description">
          Clubs! Dancing! Drinks! It's all fun, but who knows what will happen. We are here for you
          to ease the minds of anyone else when you go out tonight! Choose from a list of great clubs you
          are visiting, and we'll send that information to an emergency contact!
        </p>
      </div>
      <div className="selected-clubs-container">
        <h1 className="selected-clubs-title">Selected Clubs</h1>
        <ul className="selected-clubs-list">
          {selectedVenues.map((venue, index) => (
            <li key={index} className="selected-clubs-item">
              {venue}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <input
          type="email"
          name="to"
          placeholder="Emergency Contact"
          value={emailData.to}
          onChange={handleInputChange}
          className="email-input"
        />
        <button onClick={sendEmail} className="send-email-button">
          Send Email
        </button>
      </div>
      <div className="venues-container">
        <ul className="venues-list">
          {venues.map((venue, index) => (
            <li key={index} className="venue-item" onClick={() => handleClickedVenue(venue.name)}>
              {venue.name}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Safety;
