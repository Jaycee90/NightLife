import React from "react";
import '../css/Template.css';
import "leaflet/dist/leaflet.css";
import 'react-calendar/dist/Calendar.css';

function convertHoursToMinutes(openingHours) {
  let [openingTime, closingTime] = openingHours.split(' - ').map(timeStringToMinutes);

  // Add 1440 minutes (24 hours) to closingTime
  closingTime += 1440;

  return { openingTime, closingTime };
}

function timeStringToMinutes(timeString) {
  const [timePart, amPm] = timeString.split(' '); // Split the time and AM/PM part

  let [hours, minutes] = timePart.split(':').map(Number);

  if (amPm.toLowerCase() === 'pm' && hours !== 12) {
    hours += 12; // If PM and not noon (12:00 PM), add 12 hours
  } else if (amPm.toLowerCase() === 'am' && hours === 12) {
    hours = 0; // Handle 12:00 AM (midnight)
  }

  const totalMinutes = hours * 60 + minutes;
  return totalMinutes;
}

function Test() {
  const now = new Date();
  const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, ...
  const currentTime = now.getHours() * 60 + now.getMinutes(); 

  //const [date, setDate] = useState(new Date());
  const { openingTime, closingTime } = convertHoursToMinutes("11:00 AM - 2:00 AM");

  const isOpen = currentTime >= openingTime && currentTime <= closingTime;

  return (
    <div>
      <div className="container" style={{ 'paddingTop': '25px' }}>
        <div className="grid-container">
        <div class="item1">
        <p class="section-text" style={{'text-align':'left', 'color':'black', 'font-size': '15px'}}>Current day: {currentDay}</p>
        <p class="section-text" style={{'text-align':'left', 'color':'black', 'font-size': '15px'}}>Current time: {currentTime}</p>
        <p class="section-text" style={{'text-align':'left', 'color':'black', 'font-size': '15px'}}>Opening hours: 11:00 AM - 2:00 AM</p>
        <p class="section-text" style={{'text-align':'left', 'color':'black', 'font-size': '15px'}}>Opening time: {openingTime}</p>
        <p class="section-text" style={{'text-align':'left', 'color':'black', 'font-size': '15px'}}>Closing time: {closingTime}</p>
        <p class="section-text" style={{'text-align':'left', 'color':'black', 'font-size': '15px'}}>Open or Closed: {isOpen ? "OPEN" : "CLOSED"}</p>

      </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
