import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useParams } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faFacebook,faInstagram,faYelp} from "@fortawesome/free-brands-svg-icons";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import '../css/Template.css';

function formatPhoneNumber(phone) {
  // Format retrieved phone number from XXXXXXXXXX to (XXX)-XXX-XXXX
  const cleaned = ('' + phone).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ')-' + match[2] + '-' + match[3];
  }
  return null;
}

function convertHoursToMinutes(openingHours) {
  // Replace U+2013 with "-" and U+202f with a regular space (e.g. 11:00 AM – 12:00 AM)
  openingHours = openingHours.replace(/\u2013/g, '-').replace(/\u202f/g, ' ');

  if (openingHours === 'CLOSED') {
    return { openingTime: 0, closingTime: 0 };
  } else if (openingHours === 'Open 24 hours') {
    return { openingTime: 0, closingTime: 1440 }; // 0 minutes to 24 hours
  }

  let [openingTime, closingTime] = openingHours.split(' - ').map(timeStringToMinutes);

  if (closingTime < 720){ // Add 1440 minutes (24 hours) to closingTime if AM
    closingTime += 1440;
  }

  return { openingTime, closingTime };
}


function timeStringToMinutes(timeString) {
  const [timePart] = timeString.split(' '); // Split the time and AM/PM part

  let [hours, minutes] = timePart.split(':').map(Number);

  if (hours === 12) {
    // If it's 12:00 PM, set hours to 12 (no change)
  } else if (timeString.toLowerCase().includes('pm')) {
    hours += 12; // Add 12 hours for PM times (except 12:00 PM)
  }

  const totalMinutes = hours * 60 + minutes;
  return totalMinutes;
}

function formatAmenities(amenitiesString) {
  if (!amenitiesString) {
    return []; // or you can return a default value, an empty array in this case
  }
  
  const amenitiesList = amenitiesString.split(',');
  return amenitiesList;
}


function Data(props) {
  const [venueData, setVenueData] = useState({
    name: "",
    address: "",
    latitude: 0,
    longitude: 0,
    image: [],
    phone: 0,
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: "",
    sunday: "",
    facebook: "",
    instagram: "",
    yelp: "",
    amenities: "",
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

  const now = new Date();
  const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, ...
  const currentTime = now.getHours() * 60 + now.getMinutes(); 
  
  // Assigns the openingTime and closingTime based on the current day of the week (unconventially, will fix eventually)
  let openingTime, closingTime;
  if (currentDay === 0) {({ openingTime, closingTime } = convertHoursToMinutes(venueData.sunday));} 
  else if (currentDay === 1) {({ openingTime, closingTime } = convertHoursToMinutes(venueData.monday));} 
  else if (currentDay === 2) {({ openingTime, closingTime } = convertHoursToMinutes(venueData.tuesday));} 
  else if (currentDay === 3) {({ openingTime, closingTime } = convertHoursToMinutes(venueData.wednesday));} 
  else if (currentDay === 4) {({ openingTime, closingTime } = convertHoursToMinutes(venueData.thursday));} 
  else if (currentDay === 5) {({ openingTime, closingTime } = convertHoursToMinutes(venueData.friday));} 
  else if (currentDay === 6) {({ openingTime, closingTime } = convertHoursToMinutes(venueData.saturday));}
  
  const isOpen = currentTime >= openingTime && currentTime <= closingTime;

  const images = venueData.image
  ? venueData.image.map((url) => ({
      original: url,
      thumbnail: url
    }))
  : [];

  const formattedAmenities = formatAmenities(venueData.amenities);

  return (
    <div>
      <div className="about-section">
        <div className="item">
          <h2 className="h2 section-title" style={{ 'float': 'left', 'textAlign': 'left' }}>{venueData.name}</h2>
          <p style={{ 'float': 'left', 'textAlign': 'left', 'color': 'black', 'fontSize': '15px', 'width': '90%' }}>{venueData.address}</p>
          <p style={{ 'float': 'left', 'textAlign': 'left', 'color': 'black', 'fontSize': '15px', 'width': '90%' }}>{venueData.about}</p>
          {isOpen ? (
            <button style={{ 'float': 'left', 'textAlign': 'left', 'color': 'black', 'fontSize': '1.5em' , 'backgroundColor':'#65e0ab'}} className="btn btn-primary">OPEN NOW</button>
          ) : (
            <button style={{ 'float': 'left', 'textAlign': 'left', 'color': 'black', 'fontSize': '1.5em' }} className="btn btn-primary">CLOSED</button>
          )}
        </div>
        <div className="item" >
          <ImageGallery items={images}
          showPlayButton={false} // Set to true or false based on your preference
          showFullscreenButton={false}/></div>
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
          <div className="section-text" style={{ 'float': 'left', 'text-align': 'left', 'color': 'black', 'font-size': '15px', 'columnCount': '4', 'columnGap': '50px' }}>
            {formattedAmenities.map((amenity, index) => (
              <span key={index}>{amenity}<br /></span>
            ))}
          </div>
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
            <div style={{ 'margin-left':'130px', 'text-align':'left','color':'black', 'font-size': '15px'}}>
              <div style={{'padding-bottom':'10px'}}>
                <span style={{'display': 'inline-block', 'width': '100px'}}>Monday:</span>{venueData.monday}
              </div>
              <div style={{'padding-bottom':'10px'}}>
                <span style={{'display': 'inline-block', 'width': '100px'}}>Tuesday:</span>{venueData.tuesday}
              </div>
              <div style={{'padding-bottom':'10px'}}>
                <span style={{'display': 'inline-block', 'width': '100px'}}>Wednesday:</span>{venueData.wednesday}
              </div>
              <div style={{'padding-bottom':'10px'}}>
                <span style={{'display': 'inline-block', 'width': '100px'}}>Thursday:</span>{venueData.thursday}
              </div>
              <div style={{'padding-bottom':'10px'}}>
                <span style={{'display': 'inline-block', 'width': '100px'}}>Friday:</span>{venueData.friday}
              </div>
              <div style={{'padding-bottom':'10px'}}>
                <span style={{'display': 'inline-block', 'width': '100px'}}>Saturday:</span>{venueData.saturday}
              </div>
              <div style={{'padding-bottom':'10px'}}>
                <span style={{'display': 'inline-block', 'width': '100px'}}>Sunday:</span>{venueData.sunday}
              </div>
            </div>

            </div>  
            <div class="item4"> 
                <h4 style={{'color':'black', 'font-size': '25px'}}> Follow us on</h4>
                <div class="social-container">
                    <a href={venueData.facebook} className="facebook social"><FontAwesomeIcon icon={faFacebook} size="1x" /></a>
                    <a href={venueData.instagram} className="instagram social"><FontAwesomeIcon icon={faInstagram} size="1x" /></a>
                    <a href={venueData.yelp} className="yelp social"><FontAwesomeIcon icon={faYelp} size="1x" /></a>

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
