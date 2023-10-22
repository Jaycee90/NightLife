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
        <div>
           <h1>Upcoming Events</h1>
      <ul>
        {eventData.map((event, index) => (
          <li key={index}>
            <strong>Date: {event.day}</strong>
           
            <p>Event: {event.divText}</p>
          </li>
        ))}
      </ul>
       
       <div class="event-container">
      <h3 class="year">This Week</h3>
      

      <div class="event">
        <div class="event-left">
          <div class="event-date">
            <div class="date">22</div>
            <div class="month">Dec</div>
          </div>
        </div>

        <div class="event-right">
          <h3 class="event-title">Some Title Here</h3>

          <div class="event-description">
            Description of the Event Goes here with the Location
          </div>

          <div class="event-timing">
            <img src="https://i.imgur.com/P0ajz6E.png" alt="" /> 10:45 am
          </div>
        </div>
      </div>

      <div class="event">
        <div class="event-left">
          <div class="event-date">
            <div class="date">22</div>
            <div class="month">Dec</div>
          </div>
        </div>

        <div class="event-right">
          <h3 class="event-title">Some Title Here</h3>

          <div class="event-description">
            Description of the Event Goes here with the Location
          </div>

          <div class="event-timing">
            <img src="https://i.imgur.com/P0ajz6E.png" alt="" /> 10:45 am
          </div>
        </div>
      </div>

      <h3 class="year">Upcoming Weeks</h3>

      <div class="event">
        <div class="event-left">
          <div class="event-date">
            <div class="date">8</div>
            <div class="month">Jan</div>
          </div>
        </div>

        <div class="event-right">
          <h3 class="event-title">Some Title Here</h3>

          <div class="event-description">
            Description of the Event Goes here with the Location
          </div>

          <div class="event-timing">
            <img src="https://i.imgur.com/P0ajz6E.png" alt="" /> 10:00 am
          </div>
        </div>
      </div>

      <div class="event">
        <div class="event-left">
          <div class="event-date">
            <div class="date">9</div>
            <div class="month">Mar</div>
          </div>
        </div>

        <div class="event-right">
          <h3 class="event-title">Some Title Here</h3>

          <div class="event-description">
            Description of the Event Goes here with the Location
          </div>

          <div class="event-timing">
            <img src="https://i.imgur.com/P0ajz6E.png" alt="" /> 10:30 am
          </div>
        </div>
      </div>

      <div class="event">
        <div class="event-left">
          <div class="event-date">
            <div class="date">4</div>
            <div class="month">Apr</div>
          </div>
        </div>

        <div class="event-right">
          <h3 class="event-title">Some Title Here</h3>

          <div class="event-description">
            Description of the Event Goes here with the Location
          </div>

          <div class="event-timing">
            <img src="https://i.imgur.com/P0ajz6E.png" alt="" /> 10:00 am
          </div>
        </div>
      </div>

      <div class="event">
        <div class="event-left">
          <div class="event-date">
            <div class="date">8</div>
            <div class="month">Jun</div>
          </div>
        </div>

        <div class="event-right">
          <h3 class="event-title">Some Title Here</h3>

          <div class="event-description">
            Description of the Event Goes here with the Location
          </div>

          <div class="event-timing">
            <img src="https://i.imgur.com/P0ajz6E.png" alt="" /> 10:00 am
          </div>
        </div>
      </div>
    </div> 
        </div>
    );
};

export default SpecialEvent;