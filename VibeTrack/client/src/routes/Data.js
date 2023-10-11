import React, { useState, useEffect } from "react";
import '../css/Template.css';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useParams } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faYoutube,faFacebook,faTwitter, faInstagramSquare} from "@fortawesome/free-brands-svg-icons";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function formatPhoneNumber(phone) {
  // Format retrieved phone number from XXXXXXXXXX to (XXX)-XXX-XXXX
  const cleaned = ('' + phone).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ')-' + match[2] + '-' + match[3];
  }
  return null;
}

function Data(props) {
  const [venueData, setVenueData] = useState({
    name: "",
    address: "",
    latitude: 0,
    longitude: 0,
    image: "",
    phone: 0,
  });

  const params = useParams();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`http://localhost:5050/record/${params.id}`);

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const venue = await response.json();
      if (!venue) {
        window.alert(`Venue with id ${params.id} not found`);
        return;
      }

      setVenueData(venue);
    }

    fetchData();
  }, [params.id]);

  
  const [date, setDate] = useState(new Date());
  const icon = L.icon({ iconUrl: "https://i.imgur.com/yyb78tO.png" });
  const formattedPhoneNumber = formatPhoneNumber(venueData.phone);
  return (
    <div>
      <div className="about-section">
        <div className="item">
          <h2 className="h2 section-title" style={{ 'float': 'left', 'textAlign': 'left' }}>{venueData.name}</h2>
          <p style={{ 'float': 'left', 'textAlign': 'left', 'color': 'black', 'fontSize': '15px', 'width': '90%' }}>{venueData.address}</p>
          <p style={{ 'float': 'left', 'textAlign': 'left', 'color': 'black', 'fontSize': '15px', 'width': '90%' }}>{venueData.about}</p>
          <button style={{ 'float': 'left', 'textAlign': 'left', 'color': 'black', 'fontSize': '1.5em' }} className="btn btn-primary">Invite a Friend</button>
        </div>
        <div className="item" ><img src={venueData.image} alt="Something" height='400px' width='800px' style={{ 'borderRadius': '30px', 'object-fit': 'contain'}}/></div>
      </div>

      <div className="container" style={{ 'paddingTop': '25px' }}>
        <div className="grid-container">
        <div class="item1">
          <p class="section-text" style={{'float':'left','text-align':'left', 'color':'black', 'font-size': '15px'}}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
          A quos, voluptatum illum mollitia dolores libero placeat nesciunt quasi adipisci impedit! Fusce hic augue velit wisi quibusdam pariatur, iusto primis, nec nemo, rutrum. Vestibulum cumque laudantium.
          Sit ornar mollitia tenetur, aptent.</p>
          <p class="section-text" style={{'float':'left','text-align':'left', 'color':'black', 'font-size': '15px'}}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
          A quos, voluptatum illum mollitia dolores libero placeat nesciunt quasi adipisci impedit! Fusce hic augue velit wisi quibusdam pariatur, iusto primis, nec nemo, rutrum. Vestibulum cumque laudantium.
          Sit ornar mollitia tenetur, aptent.</p>
          <p class="section-text" style={{'float':'left','text-align':'left', 'color':'black', 'font-size': '15px'}}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
          A quos, voluptatum illum mollitia dolores libero placeat nesciunt quasi adipisci impedit! Fusce hic augue velit wisi quibusdam pariatur, iusto primis, nec nemo, rutrum. Vestibulum cumque laudantium.
          Sit ornar mollitia tenetur, aptent.</p>
          <p class="section-text" style={{'float':'left','text-align':'left', 'color':'black', 'font-size': '15px'}}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
          A quos, voluptatum illum mollitia dolores libero placeat nesciunt quasi adipisci impedit! Fusce hic augue velit wisi quibusdam pariatur, iusto primis, nec nemo, rutrum. Vestibulum cumque laudantium.
          Sit ornar mollitia tenetur, aptent.</p>
          <p></p>
      </div>
        <div className="item2">
          <div style={{ display: "flex" }}>
            <MapContainer
              style={{
                height: "50vh",
                width: "100%",
              }}
              center={[29.8833, -97.9414]} //  {[{venueData.latitude}, {venueData.longitude}]} center somewhere else??
              zoom={16}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[venueData.latitude, venueData.longitude]} icon={icon}>
                <Popup>
                  {venueData.name} <br /> Coordinates: {venueData.latitude}, {venueData.longitude}
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
          <div class="item3">
            <h4 style={{'color':'black', 'font-size': '25px','padding-bottom':'10px'}}> Opening Hours</h4>
            <div style={{'margin-left':'150px', 'text-align':'left','color':'black', 'font-size': '15px'}}>
                <span style={{'padding-bottom':'10px'}}>Monday: &emsp;&emsp; 3PM - 2AM<br></br></span> 
                <span style={{'padding-bottom':'10px'}}>Tuesday: &emsp;&emsp; 3PM - 2AM</span> 
                <span style={{'padding-bottom':'10px'}}>Wednesday:&emsp;3PM - 2AM</span> 
                <span style={{'padding-bottom':'10px'}}>Thursday:&emsp;&emsp;12PM - 2AM</span> 
                <span style={{'padding-bottom':'10px'}}>Friday: &emsp;&emsp;&nbsp;&ensp;  12PM - 2AM</span> 
                <span style={{'padding-bottom':'10px'}}>Saturday:  &nbsp;&emsp;&nbsp;&nbsp;12PM - 2AM</span> 
                <span style={{'padding-bottom':'10px'}}>Sunday: &nbsp;&emsp;&emsp; 12PM - 2AM</span> 
            </div>
            </div>  
            <div class="item4"> 
                <h4 style={{'color':'black', 'font-size': '25px'}}> Follow us on</h4>
                <div class="social-container">
                    <a href="https://www.youtube.com/" className="youtube social"><FontAwesomeIcon icon={faYoutube} size="1x" /></a>
                    <a href="https://www.facebook.com/" className="facebook social"><FontAwesomeIcon icon={faFacebook} size="1x" /></a>
                    <a href="https://www.twitter.com/" className="twitter social"><FontAwesomeIcon icon={faTwitter} size="1x" /></a>
                    <a href="https://www.instagram.com/"className="instagram social"><FontAwesomeIcon icon={faInstagram} size="1x" /></a>
                </div>
                <span style={{'color':'black', 'font-size': '15px'}}>Or call us at {formattedPhoneNumber} <br/>during our open hours.</span> 
            </div>
            <div class="item5">
                <h4 style={{'color':'black', 'font-size': '25px'}}>Upcoming Events</h4>
                <div className='app'>
                  <div className='calendar-container' style={{'font-size': '15px','margin-left':'50px',}}>
                    <Calendar onChange={setDate} value={date} />
                  </div>
                </div>
              </div>
        </div>
      </div>
    </div>
  );
};

export default Data;
