import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../css/Discover.css';

const Discover = () => {
  const [venueData, setVenueData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const venuesPerPage = 10;

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
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Doesn't work like pageClick?

    return;
  }, []);

  const indexOfLastVenue = currentPage * venuesPerPage;
  const indexOfFirstVenue = indexOfLastVenue - venuesPerPage;
  const currentVenues = venueData.slice(indexOfFirstVenue, indexOfLastVenue);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(venueData.length / venuesPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePageClick = (event) => {
    setCurrentPage(Number(event.target.id));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const renderPageNumbers = pageNumbers.map(number => (
    <li
      key={number}
      id={number}
      onClick={handlePageClick}
    >
      {number}
    </li>
  ));

  return (
    <div>
      <p className="section-subtitle">Discover all nightclubs and venues in the San Marcos area </p>
      <h2 className="h2 section-title">Discover venues</h2>
      <section className="clublist" id="destination">
        <div className="container">
          {currentVenues.map((venueData) => (
            <div className="clublist-card" style={{marginBottom: '15px'}} key={venueData._id}>
              <figure className="card-img"><img src={venueData.image} alt={venueData.name} loading="lazy" /></figure>
              <div className="card-content">
                <div className="grid-clublist">
                  <div className="item">
                    <h3 className="h3 card-title"><Link to={`/data/${venueData._id}`}>{venueData.name}</Link></h3>
                    <p className="card-subtitle">{venueData.address}</p>
                  </div>
                  <div className="item">
                    <p className="card-text">{venueData.about.length > 300 ? venueData.about.slice(0, 300) + "..." : venueData.about}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button className="btn btn-primary">Discover More</button>
          <ul className="pagination">
            {renderPageNumbers}
        </ul>
        </div>
      </section>
    </div>
  );
};

export default Discover;
