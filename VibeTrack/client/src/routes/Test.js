
import { useState } from 'react';
import '../css/test.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function Test(){
    const [date, setDate] = useState(new Date());

    return (
      <div className='test-component' style={{padding:'20px'}}>
       <h4 style={{'color':'#000', 'font-size': '20px', paddingBottom:'10px'}}>Upcoming Events</h4>
                  <div className='calendar-container' style={{'font-size': '15px','margin-left':'50px', color:'#000'}}>
                    <Calendar onChange={setDate} value={date} style={{ color: '#000' }} />
                </div>
      </div>
    );
  };
export default Test;
