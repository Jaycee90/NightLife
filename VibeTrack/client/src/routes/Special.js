import "../css/special.css";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SpecialEvent() {
  const [eventData, setEventData] = useState([]); // Hold events while live scrapping

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
    <div className="event-container">
      <h1 style={{color:'#000'}}>Upcoming Events</h1>
      
      <ul style={{color:'#000'}}>
        {eventData.map((event, index) => { 
          const { venue, eventName, time } = parseDivText(event.divText);
          const { day, month, date } = parseEventDay(event.day);
          return (
            <li key={index}>
              <div className="event"> </div>
              <div className="event-left"> </div>
              <div className="event-date"> 
                <h1>Date: {day} - Month {month}  Date {date}</h1>
                <p className="event-description">Venue: {venue}</p>
                <p className="event-description">Event: {eventName}</p>
                <p className="event-description">Time: {time}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SpecialEvent;
