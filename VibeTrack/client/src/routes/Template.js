import React from "react";
import '../css/Template.css';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//import Axios from 'axios';//axios library used to make http request
import {
    faYoutube,
    faFacebook,
    faTwitter,
    faInstagram
  } from "@fortawesome/free-brands-svg-icons";
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
  

function Template() {
    const [date, setDate] = useState(new Date());
    
    const locationCoord = [29.8833, -97.9414];
    const icon = L.icon({ iconUrl: "https://i.imgur.com/yyb78tO.png" });

    return (
        <div>

            <div class="about-section" >
                    <div class="item">
                    <h2 class="h2 section-title" style={{'float':'left','text-align':'left'}}> Zelicks Ice House</h2>
                        <p style={{'float':'left','text-align':'left', 'color':'black', 'font-size': '15px', 'width':'90%'}} >  336 W. Hopkins St. San Marcos, TX 78666 | (512) 757-8787</p>
                        <p style={{'float':'left','text-align':'left', 'color':'black', 'font-size': '15px', 'width':'90%'}}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                        A quos, voluptatum illum mollitia dolores libero placeat nesciunt quasi adipisci impedit! Fusce hic augue velit wisi quibusdam pariatur, iusto primis, nec nemo, rutrum. Vestibulum cumque laudantium.
                        Sit ornar mollitia tenetur, aptent.</p>
                        <button style={{'float':'left','text-align':'left', 'color':'black', 'font-size': '1.5em'}} class="btn btn-primary">Invite a Friend</button>

                   </div>
                    <div class="item"><img src="https://i.imgur.com/ikuh0yR.jpg" width="600px" alt="Something" style={{'border-radius':'30px'}}/></div>
   
            </div>

            <div class = "container" style={{'padding-top':'25px'}}>
                <div class="grid-container">
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
                    <div class="item2"><div style={{ display: "flex" }}>
                        <MapContainer
                            style={{
                            height: "50vh",
                            width: "100%",
                            }}
                            center={[29.8833, -97.9414]}
                            zoom={15}
                        >
                            {/* Add Google Maps tile URL */}
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={[29.882839, -97.945412]} icon={icon}>
                                <Popup>
                                Zelicks <br /> Coordinates: {locationCoord[0]}, {locationCoord[1]}
                                </Popup>
                            </Marker>
                        
                        </MapContainer>
                        </div>
                    </div>
                    <div class="item3">
                        <h4 style={{'color':'black', 'font-size': '25px','padding-bottom':'10px'}}> Opening Hours</h4>
                        <div style={{'margin-left':'130px', 'text-align':'left','color':'black', 'font-size': '15px'}}>
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
                        <span style={{'color':'black', 'font-size': '15px'}}>Or call us at (512) 757-8787 <br/>during our open hours.</span> 
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

export default Template;