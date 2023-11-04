import "../css/special.css";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SpecialEvent() {
  const [eventData, setEventData] = useState([]);

  function extractEventData(eventText) {
    const parts = eventText.split(' - ');

    if (parts.length === 2) {
      const venue = parts[0].trim();
      const eventContent = parts[1].match(/^(.*?)\s\((.*?)\)$/);

      if (eventContent) {
        const eventName = eventContent[1].trim();
        const time = eventContent[2].trim();

        return { venue, eventName, time };
      }
    }

    return null;
  }

  useEffect(() => {
    axios.get('http://localhost:5050/scrape')
      .then((response) => {
        const formattedEventData = response.data.map(event => extractEventData(event.divText)).filter(Boolean);
        setEventData(formattedEventData);
      })
      .catch((error) => {
        console.error('Error fetching event data', error);
      });
  }, []);

  return (
    <div className="event-container">
      <h1 style={{ color: '#000' }}>Upcoming Events</h1>
      <ul style={{ color: '#000' }}>
        {eventData.map((event, index) => (
          <li key={index}>
            <div className="event">
              <div className="event-left"></div>
              <div className="event-date">
                <p className="event-description">{`${event.venue} - ${event.eventName} (${event.time})`}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SpecialEvent;
