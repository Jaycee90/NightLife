import React, { useEffect, useState } from 'react';
import { Chip, FormControl, Input, makeStyles,} from "@material-ui/core";
import '../css/safety.css';

const useStyles = makeStyles((theme) => ({
  formControlRoot: {
    display: "flex",
    backgroundColor: "#fff",
    alignItems: "center",
    gap: "8px",
    flexWrap: "wrap",
  flexDirection: "row",
  padding:4,
  borderRadius:'4px',
    "&> div.container": {
      gap: "6px",
      display: "flex",
      flexDirection: "row",
      backgroundColor: "#fff",
      flexWrap: "wrap"
    },
    "& > div.container > span": {
      backgroundColor: "#fff",
      padding: "1px 3px",
      borderRadius: "4px"
    }
  }
}));

function Safety() {
  const [venues, setVenues] = useState([]);
  const [selectedVenues, setSelectedVenues] = useState([]);
  const [emailData, setEmailData] = useState({
    to: '',
    subject: "Here's a list of clubs I am visiting tonight",
    text: '',
  });

  const classes = useStyles();
  const [values, setValues] = useState(["test"]);
  const [currValue, setCurrValue] = useState("");
  const handleKeyUp = (e) => {
    console.log(e.keyCode);
    if (e.keyCode === 13) {
      setValues((oldState) => [...oldState, e.target.value]);
      setCurrValue("");
    }
  };

  const handleChange = (e) => {
    setCurrValue(e.target.value);
  };

  const handleDelete = ( item, index) =>{
    let arr = [...values]
    arr.splice(index,1)
    console.log(item)
    setValues(arr)
  }
  useEffect(() => {
    const getVenues = async () => {
      try {
        const response = await fetch(`http://localhost:5050/record/`);

        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          window.alert(message);
          return;
        }

        const venueData = await response.json();
        setVenues(venueData);
      } catch (error) {
        console.log('Error fetching venues from the database: ', error);
      }
    };
    getVenues();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmailData({
      ...emailData,
      [name]: value,
    });
  };

  const sendEmail = () => {
    const messageWithSelectedVenues = `Selected Venues:\n${selectedVenues.join('\n')}`;
    const emailDataWithVenues = {
      ...emailData,
      text: messageWithSelectedVenues,
    };
    fetch('http://localhost:5050/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailDataWithVenues),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log('Email sent:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleClickedVenue = (clickedVenue) => {
    if (selectedVenues.includes(clickedVenue)) return;
    else {
      setSelectedVenues([...selectedVenues, clickedVenue]);
    }
  };

  return (
    <div>
      <div className="intro-container"  style={{marginTop:"20px"}}>
        <h1 className="intro-title">Safety First!</h1>
        <p className="intro-description">Clubs! Dancing! Drinks! It's all fun, but who knows what will happen.</p>
        <p className="intro-description">We are here for you to ease the minds of anyone else when you go out tonight! </p>
        <p className="intro-description">Choose from a list of great clubs you are visiting, and we'll drop them a message or alert them if something goes wrong.</p>
      </div>
      <div>	
        <FormControl classes={{ root: classes.formControlRoot }}>
				  <div className={"container"}>
					  {values.map((item,index) => (
						  <Chip  size="small" onDelete={()=>handleDelete(item,index)} label={item} style={{backgroundColor:'#747474', color:'#fff'}}/>
					  ))}
				  </div>
				  <Input
					  value={currValue}
					  onChange={handleChange}
					  onKeyDown={handleKeyUp}
            placeholder="Enter email"
            style={{background:'#fff', color:'#747474', width:'200px'}}
            inputProps={{ style: { backgroundColor: "#fff", color:'#747474' } }}
				  />
			  </FormControl></div>

      <div className="selected-clubs-container">
        <h1 className="selected-clubs-title">Selected Clubs</h1>
        <ul className="selected-clubs-list">
          {selectedVenues.map((venue, index) => (
            <li key={index} className="selected-clubs-item">
              {venue}
            </li>
          ))}
        </ul>
      </div>
      <div className="grid-safety">
        <div class="item">
          <input
            type="text"
            name="to"
            placeholder="Enter emails of your emergency contacts (comma separated)"
            value={emailData.to}
            onChange={handleInputChange}
            className="email-input"
            style={{borderRadius:"10px", height:"40px", background:'#fff', color:'#747474'}}
        />
        </div>
        <div class="item">
          <button onClick={sendEmail} className="send-email-button"  style={{borderRadius:"10px",  height:"40px", marginTop:'10px'}}>
            Send Email
          </button>
        </div>
        
      </div>
      <div className="venues-container">
        <ul className="venues-list">
          {venues.map((venue, index) => (
            <li key={index} className="venue-item" onClick={() => handleClickedVenue(venue.name)}>
              {venue.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Safety;
