import React from "react";
import '../css/Template.css';
import "leaflet/dist/leaflet.css";
import 'react-calendar/dist/Calendar.css';

function convertHoursToMinutes(openingHours) {
  const [openingTime, closingTime] = openingHours.split(' - ').map(timeStringToMinutes);
  return { openingTime, closingTime };
}

function timeStringToMinutes(timeString) { // 2:45PM to 2 hours and 45 mins = 2*60 + 45
  const [timePart, amPm] = timeString.split(' '); // Split the time and AM/PM part

  let [hours, minutes] = timePart.split(':').map(Number);

  // If it's PM and not noon (12:00 PM), add 12 hours
  if (amPm.toLowerCase() === 'pm' && hours !== 12) {
    hours += 12;
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
  const { openingTime, closingTime } = convertHoursToMinutes("11:00 AM - 4:00 PM");

  const isOpen = currentTime >= openingTime && currentTime <= closingTime;

  return (
    <div>
      <div className="container" style={{ 'paddingTop': '25px' }}>
        <div className="grid-container">
        <div class="item1">
        <p class="section-text" style={{'text-align':'left', 'color':'black', 'font-size': '15px'}}>Current day: {currentDay}</p>
        <p class="section-text" style={{'text-align':'left', 'color':'black', 'font-size': '15px'}}>Current time: {currentTime}</p>
        <p class="section-text" style={{'text-align':'left', 'color':'black', 'font-size': '15px'}}>Opening hour: {openingTime}</p>
        <p class="section-text" style={{'text-align':'left', 'color':'black', 'font-size': '15px'}}>Closing hour: {closingTime}</p>
        <p class="section-text" style={{'text-align':'left', 'color':'black', 'font-size': '15px'}}>Open or Closed: {isOpen ? "OPEN" : "CLOSED"}</p>

      </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
