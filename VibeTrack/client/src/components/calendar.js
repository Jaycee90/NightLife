
import { useState } from 'react';
import Calendar from 'react-calendar';
import '../css/calendar.css';
import 'react-calendar/dist/Calendar.css';

function EventCalendar() {

  const [date, setDate] = useState([
    new Date(2023, 11, 2),
    new Date(2023, 11, 22),
  ]);
  return (
    <div className="calendar-component">
<div className='calendar-container'>
        <Calendar
          onChange={setDate}
          value={date}
          selectRange={true}
        />
      </div>
    </div>
  );
};

export default EventCalendar;