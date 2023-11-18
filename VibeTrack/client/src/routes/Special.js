import "../css/special.css";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from '@fortawesome/free-solid-svg-icons';
 
function SpecialEvent() {
  const [eventData, setEventData] = useState([]); // Hold events while live scrapping
  const [friendEmail, setFriendEmail] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [emailData, setEmailData] = useState({
    to: '',
    subject: "Hey, join me at this event!",
    text: '',
  });
 
  // Open the pop up
  const openModal = () => {
    setShowModal(true);
  }
  // Close the pop up
  const closeModal = () => {
    setShowModal(false);
  }
 
  const sendEmail = () => {
    const messageWithSelectedVenues = 'Location';
    const emailDataWithVenues = {
      ...emailData,
      to: friendEmail,
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
      closeModal();
  };
 
  useEffect(() => {
    axios.get('http://localhost:5050/scrape')
      .then((response) => {
        setEventData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching event data', error);
      });
  }, []);
 
  const parseDivText = (divText) => {
    const parts = divText.split(' - ');
    if (parts.length !== 2) {
      return { venue: '', eventName: '', time: '' }; // Return empty values if format is incorrect
    }
    const [venue, rest] = parts;
    const [eventName, time] = rest.split(' (');
    if (!eventName || !time) {
      return { venue: '', eventName: '', time: '' }; // Return empty values if format is incorrect
    }
    return { venue, eventName, time: time.slice(0, -1) }; // Remove the trailing ')'
  };
  
  const parseEventDay = (eventDay) => {
    const parts = eventDay.split(' - ');
    if (parts.length !== 2) {
      return { day: '', month: '', date: '' }; // Return empty values if format is incorrect
    }
    const [day, date] = parts;
    const [monthName, dayOfMonth] = date.split(' ');
    if (!monthName || !dayOfMonth) {
      return { day: '', month: '', date: '' }; // Return empty values if format is incorrect
    }
    return { day, month: monthName, date: dayOfMonth };
  };
  
  return (
    <div  style={{marginBottom:'20px'}}>
    <p className="section-subtitle" >Discover all nightclubs and venues in the San Marcos area </p>
    <h2 className="h2 section-title">Discover upcoming events</h2>
    <div className="special-event">
    <div className="event-container" style={{paddingTop:"30px"}}>
      <ul style={{color:'#000'}}>
        {eventData.map((event, index) => {
          const { venue, eventName, time } = parseDivText(event.divText);
          const { day, month, date } = parseEventDay(event.day);
        
          if (!venue || !eventName || !time || !day || !month || !date) {
            // Skip rendering if any of the required data is missing
            return null;
          }
          return (
            <li key={index}>
                    <div class="event">
                      <div class="event-left">
                        <div class="event-date">
                          <div class="date">{date}</div>
                          <div class="month">{month}</div>
                          <div class="event-timing"><FontAwesomeIcon icon={faClock} style={{marginBottom:'5px', paddingRight:'5px'}}/> {time}</div>
                          <button onClick={openModal}>Invite Friends</button>
                        </div>
                      </div>
 
                      <div class="event-right">
                        <div className="grid-event">
                          <div class="item"><h3 class="event-title">{venue} </h3></div>
                          <div class="item" style={{paddingLeft:'20px'}}><div class="event-button">Share this Event!</div></div>
                        </div>
                        <div class="event-description" style={{paddingBottom:'20px'}}>{day}: {eventName} </div>
                          
                      </div>
                    </div>
            </li>
          );
        })}
      </ul>
 
    </div>
    </div>
    {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>Invite a Friend</h2>
            <input
              type="email"
              placeholder="Enter friend's email"
              value={friendEmail}
              onChange={(e) => setFriendEmail(e.target.value)}
            />
            <button onClick={sendEmail}>Submit</button>
          </div>
        </div>
      )}
    </div>
  );
}
 
export default SpecialEvent;