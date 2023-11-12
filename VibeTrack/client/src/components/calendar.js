
import { useState } from 'react';
import Calendar from 'react-calendar';
import '../css/calendar.css';
import 'react-calendar/dist/Calendar.css';

function EventCalendar() {
  const [date, setDate] = useState(new Date());

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