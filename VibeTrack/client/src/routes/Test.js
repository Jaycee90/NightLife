import "../css/special.css";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faLink } from '@fortawesome/free-solid-svg-icons';
import { Chip } from "@material-ui/core";

import Fuse from 'fuse.js';

function SpecialEvent() {
  const [eventData, setEventData] = useState([]); // Hold events while live scrapping
  const [showModal, setShowModal] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState({
    eventName: '',
    date: '',
    time: '',
    month: '',
  });

  const [emailData, setEmailData] = useState({
    to: '',
    subject: "Hey, join me at this event and let's have some fun!",
    text: '',
  });

  const [values, setValues] = useState(["vibetracktxt@gmail.com"]);
  const [currentValue, setCurrentValue] = useState("");

  // Open the pop up
  const openModal = (venue, event) => {
    setSelectedVenue(venue);
    setSelectedEvent(event); // Set the selected event details
    setShowModal(true);
  }

  // Close the pop up
  const closeModal = () => {
    setShowModal(false);
  }

  const handleKeyUp = (e) => {
    console.log(e.keyCode);
    if (e.keyCode === 13) {
      const newToValue = [...emailData.to.split(','), e.target.value].join(',');
      setEmailData({
        ...emailData,
        to: newToValue,
      });
      setValues((oldState) => [...oldState, e.target.value]);
      setCurrentValue("");
    }
  };

  const handleEmailChange = (e) => {
    setCurrentValue(e.target.value);
  };

  const handleEmailDelete = (item, index) => {
    let arr = [...values];
    arr.splice(index, 1);
    console.log(item);
    setValues(arr);
  }

  // Modified sendEmail function to use selectedEvent state
  const sendEmail = (venueName) => {
    const { eventName, date, time, month } = selectedEvent;
    const messageWithSelectedVenues = `I'm attending the event "${eventName}"at ${venueName}, on ${month} ${date} at ${time}! Join me there and let's hang out!`;

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
      return { venue: '', eventName: '', time: '' };
    }
    const [venue, rest] = parts;
    const [eventName, time] = rest.split(' (');
    if (!eventName || !time) {
      return { venue: '', eventName: '', time: '' };
    }
    return { venue, eventName, time: time.slice(0, -1) };
  };

  const parseEventDay = (eventDay) => {
    const parts = eventDay.split(' - ');
    if (parts.length !== 2) {
      return { day: '', month: '', date: '' };
    }
    const [day, date] = parts;
    const [monthName, dayOfMonth] = date.split(' ');
    if (!monthName || !dayOfMonth) {
      return { day: '', month: '', date: '' };
    }
    return { day, month: monthName, date: dayOfMonth };
  };

  const [searchQuery, setSearchQuery] = useState('');
  // eslint-disable-next-line
  const [venueData, setVenueData] = useState(null);

  useEffect(() => {
    async function getVenues() {
      try {
        const response = await fetch(`http://localhost:5050/record/`);

        if (!response.ok) {
          throw new Error(`An error occurred: ${response.statusText}`);
        }

        const venueData = await response.json();
        setVenueData(venueData);
      } catch (error) {
        window.alert(error.message);
      }
    }

    getVenues();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    return;
  }, []);
  

  return (
    <div style={{ marginBottom: '20px' }}>
      <p className="section-subtitle">Discover all nightclubs and venues in the San Marcos area </p>
      <h2 className="h2 section-title">Discover upcoming events</h2>
      <div className="special-event">
        <div className="event-container" style={{ paddingTop: "30px" }}>
          <ul style={{ color: '#000' }}>
            {eventData.map((event, index) => {
              const { venue, eventName, time } = parseDivText(event.divText);
              const { day, month, date } = parseEventDay(event.day);

              if (!venue || !eventName || !time || !day || !month || !date) {
                return null;
              }
              return (
                <li key={index}>
                  <div class="event">
                  <div class="event-left" style={{ backgroundImage: 'url(https://i.imgur.com/zuKZzqG.jpg)', }}>
                  <div class="overlay"  style={{ position: 'absolute', background: 'rgba(0, 0, 0, 0.75)', width:'116px', height:'120px', borderRadius: '5px 0 0 5px'}}>
                      <div class="event-date">
                        <div class="date">{date}</div>
                        <div class="month">{month}</div>
                        <div class="event-timing"><FontAwesomeIcon icon={faClock} style={{ marginBottom: '5px', paddingRight: '5px' }} /> {time}</div>
                      </div>
                      </div>
                    </div>

                    <div class="event-right">
                      <div className="grid-event">
                        <div class="item"><h3 class="event-title">{venue} </h3></div>
                        <div class="item" style={{ paddingLeft: '20px' }}>
                          <div> <button style={{ marginTop: '25px', height: '33px', backgroundColor: '#e24e99', color: '#fff' }} onClick={() => openModal(venue, { eventName, date, time, month })}><FontAwesomeIcon icon={faLink} /> Share this Event!</button></div>
                        </div>
                      </div>
 <div class="event-description" style={{ paddingBottom: '20px' }}>
      {day}: {eventName} 

{/* Perform the search for the current venue */}
{venue && searchVenue(venue)}

{/* Display the most matched venue's address */}
{mostMatchedVenue && mostMatchedVenue.address}
    </div>                    </div>
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
            <span className="close" onClick={closeModal} style={{ float: 'right', width: '10px', backgroundColor: '#fff', marginTop: '5px', top: '5px' }}>&times;</span>
            <h2 style={{ color: '#747474' }}>Invite a Friend</h2>
            <div style={{ marginTop: '20px' }}>
              {values.map((item, index) => (
                <Chip size="small" onDelete={() => handleEmailDelete(item, index)} label={item} style={{ backgroundColor: '#e24e99', color: '#fff', marginRight: '10px' }} />
              ))}
            </div>
            <input
              onChange={handleEmailChange}
              onKeyDown={handleKeyUp}
              type="email"
              placeholder="Enter email"
              name="to"
              value={currentValue}
              className="email-input"
              style={{ marginBottom: "1rem", backgroundColor: "#fff", color: '#747474' }}
              inputProps={{ style: { backgroundColor: "#fff", color: '#747474' } }}
            />
            <button style={{ backgroundColor: '#e24e99', color: '#fff', borderRadius: '10px', width: '50%', marginLeft: '150px' }} onClick={() => sendEmail(selectedVenue)}>Submit</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SpecialEvent;
