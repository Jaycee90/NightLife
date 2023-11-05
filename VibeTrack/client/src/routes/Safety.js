import React, { useEffect, useState } from 'react';
import { Chip, FormControl, Input, makeStyles,} from "@material-ui/core";
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
    <div>
      <div className="intro-container"  style={{marginTop:"20px"}}>
        <h1 className="intro-title">Safety First!</h1>
        <p className="intro-description">Clubs! Dancing! Drinks! It's all fun, but who knows what will happen.</p>
        <p className="intro-description">We are here for you to ease the minds of anyone else when you go out tonight! </p>
        <p className="intro-description">Choose from a list of great clubs you are visiting, and we'll drop them a message or alert them if something goes wrong.</p>
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
      <div className="grid-safety">
        <div class="item">
          <input
            type="text"
            name="to"
            placeholder="Enter emails of your emergency contacts (comma separated)"
            value={emailData.to}
            onChange={handleInputChange}
            className="email-input"
            style={{borderRadius:"10px", height:"40px", background:'#fff', color:'#747474'}}
        />
        </div>
        <div class="item">
          <button onClick={sendEmail} className="send-email-button"  style={{borderRadius:"10px",  height:"40px", marginTop:'10px'}}>
            Send Email
          </button>
        </div>
        
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
    </div>
  );
}

export default Safety;
