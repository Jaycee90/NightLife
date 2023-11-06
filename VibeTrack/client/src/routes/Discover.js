import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../css/discover.css';

const Discover = () => {
  const [venueData, setVenueData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

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

  const venuesPerPage = 12;
  const indexOfLastVenue = currentPage * venuesPerPage;
  const indexOfFirstVenue = indexOfLastVenue - venuesPerPage;
  const currentVenues = venueData.slice(indexOfFirstVenue, indexOfLastVenue);

  const pageNumbers = [];
  for (let i = 1; i <= (Math.ceil(venueData.length / venuesPerPage)); i++) {
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
    <div className="discover-component" style={{marginBottom:'40px'}}>
      <p className="section-subtitle" >Discover all nightclubs and venues in the San Marcos area </p>
      <h2 className="h2 section-title">Discover venues</h2>
      <div class="container" style={{paddingTop:'40px', paddingLeft:'20px', paddingRight:'20px'}}>
          <ul className="discover-list" >
          {currentVenues.map((venueData) => (
                <div className="discover-card">
                  <figure className="card-img">
                    <img src={venueData.image} alt={venueData.name} loading="lazy" />
                  </figure>

                  <div className="card-content">
                    <div className="card-rating">
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                    </div>

                    <p className="card-subtitle">{venueData.address}</p>
                    <h3 className="h3 card-title"><Link to={`/data/${venueData._id}`}>{venueData.name}</Link></h3>
                    
                    <p className="card-text">{venueData.about.length > 100 ? venueData.about.slice(0, 100) + "..." : venueData.about}</p>
                  </div>
                </div>
            ))}
          </ul>
          <ul className="pagination">
            {renderPageNumbers}
        </ul>
    </div>
    </div>
  );
};

export default Discover;
