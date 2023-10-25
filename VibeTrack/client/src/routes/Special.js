import "../css/Special.css";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SpecialEvent() {
  const [eventData, setEventData] = useState([]); // Hold events 
  // When a user clicks on the special event link, this function will be the first thing that happens
  // Making a request to out local host where our stored data is held then bring that data back here
  useEffect(() => {
    axios.get('http://localhost:5050/scrape') // Adjust the URL to match your server's address
      .then((response) => {
        setEventData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching event data', error);
      });
  }, []);
    return (
        <div class="event-container">
           <h1 style={{color:'#000'}}>Upcoming Events</h1>
      <ul style={{color:'#000'}}>
        {eventData.map((event, index) => ( 
          <li key={index}>
            <div class="event"> </div>
            <div class="event-left"> </div>
            <div class="event-date"> 
              <h1>Date: {event.day}</h1>
              <p class="event-description">Event: {event.divText}</p>
            </div>
          </li>
        ))}
      </ul>
      </div>
      );
};

export default SpecialEvent;