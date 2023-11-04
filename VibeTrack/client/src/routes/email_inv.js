import React, { useEffect, useState } from 'react';
import '../css/email_inv.css';
 
function Invitation() {
  const [venues, setVenues] = useState([]);
  const [selectedVenues, setSelectedVenues] = useState([]);
  const [emailData, setEmailData] = useState({
    to: '',
    subject: "Hey, Join me and let's have Fun!",
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
      <div className="intro-container">
        <h1 className="intro-title">Invite Your Loved Ones!</h1>
        <p className="intro-description">
          Some amazing clubs that you can join tonight and have fun with your friends. 
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
          <strong>Send Email</strong>
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
 
export default Invitation;
 