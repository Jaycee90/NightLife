import React from "react";
import "./Special.css";

function SpecialEvent() {
    return (
        <div>
        <div class = "nav" style={{'padding-bottom':'100px'}}>
            <ul class="nav-flex-row">
                <li class="nav-item"><a href="discover">Discover</a></li>
                <li class="nav-item"><a href="listing">List</a></li>
                <li class="nav-item"><a href="search">Search</a></li>
                <li class="nav-item"><a href="specialevent">Special Event</a></li>
                <li class="nav-item"><a href="login">Login</a></li>
            </ul>
        </div>
        
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