import React from "react";
import "./style_event.css";
import image from "./image/time.png"; // Import the time image

function SpecialEvent() {
    return (
        <div class="event-container">
      <h3 class="year">2023</h3>

      <div class="event">
        <div class="event-left">
          <div class="event-date">
            <div class="date">8</div>
            <div class="month">Nov</div>
          </div>
        </div>

        <div class="event-right">
          <h3 class="event-title">Some Title Here</h3>

          <div class="event-description">
            Description of the Event Goes here with the Location
          </div>

          <div class="event-timing">
            <img src="images/time.png" alt="" /> 10:00 am
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
            <img src="images/time.png" alt="" /> 10:45 am
          </div>
        </div>
      </div>

      <h3 class="year">2024</h3>

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
            <img src="images/time.png" alt="" /> 10:00 am
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
            <img src="images/time.png" alt="" /> 10:30 am
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
            <img src="images/time.png" alt="" /> 10:00 am
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
            <img src="images/time.png" alt="" /> 10:00 am
          </div>
        </div>
      </div>
    </div>
    );
};

export default SpecialEvent;