import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../css/Discover.css';

const Discover = () => {
  const [venueData, setVenueData] = useState([]);

  useEffect(() => {
    async function getVenues() {
      const response = await fetch(`http://localhost:5050/record/`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const venueData = await response.json();
      setVenueData(venueData);
    }

    getVenues();

    return;
  }, []);

  return (
    <div>
    <p className="section-subtitle">Discover all nightclubs and venues in the San Marcos area </p>
    <h2 class="h2 section-title">Discover venues</h2>
      <section className="clublist" id="destination">
        <div className="container">
          {venueData.map((venueData) => (
            <div className="clublist-card" style={{marginBottom: '15px'}} key={venueData._id}>
              <figure className="card-img"><img src={venueData.image} alt={venueData.name} loading="lazy" /></figure>
              <div className="card-content">
                <div className="grid-clublist">
                  <div className="item">
                    <h3 className="h3 card-title"><Link to={`/data/${venueData._id}`}>{venueData.name}</Link></h3>
                    <p className="card-subtitle">{venueData.address}</p>
                  </div>
                  <div className="item">
                    <p className="card-text">{venueData.about}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button className="btn btn-primary">Discover More</button>
        </div>
      </section>
    </div>
  );
};

export default Discover;
