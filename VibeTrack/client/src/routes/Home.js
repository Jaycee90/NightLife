import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import '../css/home.css';
export default function Home() {
  const [randomVenues, setRandomVenues] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getVenues = async () => {
      try {
        const response = await fetch('http://localhost:5050/record/');

        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          window.alert(message);
          return;
        }

        const venueData = await response.json();
        const randomVenues = getRandomVenues(venueData, 3);
        setRandomVenues(randomVenues);
      } catch (error) {
        console.log('Error fetching venues from the database, ', error);
      }
    };

    getVenues();
  }, []);

  const getRandomVenues = (venues, count) => {
    const randomVenues = [];
    while (randomVenues.length < count && venues.length > 0) {
      const randomIndex = Math.floor(Math.random() * venues.length);
      randomVenues.push(venues.splice(randomIndex, 1)[0]);
    }
    return randomVenues;
  };

  return (
    <div  style={{marginTop:"20px"}}>
      <div className="section-intro">
        <img src="https://i.imgur.com/SoHE2tO.png" alt="Logo" loading="lazy" style={{ height:"125px"}} />
        <p className="section-subtitle" style={{color:'#fff'}}>Uncover places, discover world</p>
        <h2 className="h2 section-title" style={{color:'#fff'}}>VibeTrack</h2>

        <div className="row-flex" style={{ marginBottom: "10px" }}>
          <div className="link-wrapper">
            <Button variant="contained" onClick={() => navigate("/login")} style={{ backgroundColor: "#e24e99 " }}>Login</Button>
          </div>
          <div className="link-wrapper">
            <Button variant="contained" onClick={() => navigate("/signup")} style={{ backgroundColor: "#e24e99 " }}>Signup</Button>
          </div>
        </div>
      </div>

      <div className="container">
          <h2 className="h2 section-title">What we do</h2>
          <div className="about-project">
            <div className="item">
              <img src="https://i.imgur.com/Pqg9FDn.png" className="circle" alt="Placeholder" loading="lazy"/>
              <hr className="hr-style"/>
              <h3  style={{marginTop:'20px'}}>Find Events</h3>
              <p className="section-text">Wondering what’s going on this weekend? VibeTrack curates a list of events happening in the San Marcos area.</p>
            </div>
            <div className="item">
              <img src="https://i.imgur.com/Pqg9FDn.png" className="circle" alt="Placeholder" loading="lazy"/>
              <hr className="hr-style"/>
              <h3  style={{marginTop:'20px'}}>Find Events</h3>
              <p className="section-text">Wondering what’s going on this weekend? Discotech curates a list of events happening in the San Marcos area.</p>  
            </div>
            <div className="item">
              <img src="https://i.imgur.com/Pqg9FDn.png"  className="circle" alt="Placeholder" loading="lazy"/>
              <hr className="hr-style"/>
              <h3  style={{marginTop:'20px'}}>Find Events</h3>
              <p className="section-text">Wondering what’s going on this weekend? Discotech curates a list of events happening in the San Marcos area.</p>
              </div>
          </div>
      </div>
      
      <hr className="hr-style"/>
      <section className="popular" id="destination">
        <div className="container">
          <h2 className="h2 section-title">Discover venues</h2>
          <p className="section-subtitle" >Experience nightlife in San Marcos, TX. Enjoy live music, late-night restaurants, bars, and dog-friendly outdoor decks. There's always something going on around you! </p>


          <ul className="popular-list" >
            {randomVenues.map((venue, index) => (
              <li key={index}>
                <div className="popular-card">
                  <figure className="card-img">
                    <img src={venue.image} alt={venue.name} loading="lazy" />
                  </figure>

                  <div className="card-content">
                    <div className="card-rating">
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                    </div>

                    <p className="card-subtitle">{venue.address}</p>
                    <h3 className="h3 card-title"><a href={venue.website}>{venue.name}</a></h3>

                    <p className="card-text">{venue.description}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <button className="btn btn-primary" style={{width:'50%',backgroundColor: "#e24e99 ", color:'#fff', borderRadius:"10px", marginBottom:'20px', }}>Discover even more venues near you</button>
        </div>
      </section>
    </div>
  );
}
