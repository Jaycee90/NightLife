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
    <div>
      <div className="section-intro">
        <img src="https://i.imgur.com/SoHE2tO.png" alt="Logo" loading="lazy" style={{ height:"125px"}} />
        <p className="section-subtitle" style={{color:"#fff"}}>Uncover places, Discover world</p>
        <h2 className="h2 section-title" style={{color:"#fff"}}>VibeTrack</h2>

        <div className="row-flex" style={{ marginBottom: "10px" }}>
          <div className="link-wrapper">
            <Button variant="contained" onClick={() => navigate("/login")} style={{ backgroundColor: "#747474" }}>Login</Button>
          </div>
          <div className="link-wrapper">
            <Button variant="contained" onClick={() => navigate("/signup")} style={{ backgroundColor: "#747474" }}>Signup</Button>
          </div>
        </div>
      </div>

      <div className="about-us">
        <h3> Lorem ipsum dolor sit, amet consectetur adipisicing elit.</h3>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          A quos, voluptatum illum mollitia dolores libero placeat
          nesciunt quasi adipisci impedit!Lorem ipsum dolor sit,
          amet consectetur adipisicing elit.
          A quos, voluptatum illum mollitia dolores libero placeat
          nesciunt quasi adipisci impedit!
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          A quos, voluptatum illum mollitia dolores libero placeat
          nesciunt quasi adipisci impedit!Lorem ipsum dolor sit.
        </p>
      </div>

      <section className="popular" id="destination">
        <div className="container">
          <h2 className="h2 section-title">Popular venues</h2>
          <p className="section-text">
            Fusce hic augue velit wisi quibusdam pariatur, iusto primis, nec nemo, rutrum. Vestibulum cumque laudantium.
            Sit ornare mollitia tenetur, aptent.
          </p>

          <ul className="popular-list">
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
          <button className="btn btn-primary">Discover venues near you</button>
        </div>
      </section>

      <div className="container">
        <div className="grid-contact">
          <div className="item">
            <h3>Leave Us a Message</h3>
            <p><span>and we will get back to you as soon as possible.</span></p>
            <form className="media-centered">
              <div className="form-group">
                <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Type in your email..." />
              </div>
              <div className="form-group">
                <input type="text" className="form-control" id="exampleText1" placeholder="Type in your message..." />
              </div>
              <button style={{ "margin-left": "175px" }} type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>

          <div className="item">
            <h3>Supervisor</h3>
            <p>
              <span>Instructor: Dr. Ted Lehr</span>
              <span>D.I. Assistant: Mirna Elizondo</span>
              <span>Grader: Sara Davidson</span>
            </p>
          </div>

          <div className="item">
            <h3>Contact</h3>
            <p>
              <span>(512) 245-2111</span>
              <span>601 University Dr</span>
              <span>San Marcos, TX 78666</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
