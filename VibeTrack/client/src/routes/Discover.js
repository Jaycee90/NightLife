import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../css/discover.css';
import Fuse from 'fuse.js';

const Discover = () => {
  const [venueData, setVenueData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [records, setRecords] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [venueFound, setVenueFound] = useState(false);
  const [foundVenues, setFoundVenueDetails] = useState(null);

  useEffect(() => {
    async function getVenues() {
      try {
        const response = await fetch(`http://localhost:5050/record/`);

        if (!response.ok) {
          throw new Error(`An error occurred: ${response.statusText}`);
        }

        const venueData = await response.json();
        setVenueData(venueData);
      } catch (error) {
        window.alert(error.message);
      }
    }

    getVenues();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    return;
  }, []);

  useEffect(() => { 
    async function getRecords() {
      try {
        const response = await fetch(`http://localhost:5050/record/`);

        if (!response.ok) {
          throw new Error(`An error occurred: ${response.statusText}`);
        }

        const records = await response.json();
        setRecords(records);
      } catch (error) {
        window.alert(error.message);
      }
    }

    getRecords();

    return;
  }, [records.length]);

  useEffect(() => {
    async function getRecords() {
      try {
        const response = await fetch(`http://localhost:5050/record/`);

        if (!response.ok) {
          throw new Error(`An error occurred: ${response.statusText}`);
        }

        const records = await response.json();
        setRecords(records);
      } catch (error) {
        window.alert(error.message);
      }
    }

    getRecords();
  }, []);

  const searchVenue = () => {
    const fuse = new Fuse(records, {
      keys: ['name'],
      includeScore: true,
      threshold: 0.3,
    });

    const searchResults = fuse.search(searchQuery);

    if (searchResults.length > 0) {
      const foundVenues = searchResults.map((result) => result.item);
      setFoundVenueDetails(foundVenues);
      setVenueFound(true);
    } else {
      setVenueFound(false);
      setFoundVenueDetails(null);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

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
      <div className="grid-discover-search">

        <div class="item" >
          <div class="container-search">
          <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search by venue name"
              style={{ borderRadius: "10px", height: "40px", fontSize:'15px', background: '#fff', color: '#747474' }}
          />
        <button onClick={searchVenue} style={{  backgroundColor: "#e24e99 ", borderRadius:'10px', fontSize:'15px', marginTop:'10px'}}>Find venues</button>

        <hr style={{color:'#fff', marginBottom:'30px', marginTop:'20px', opacity:'0.5'}}/>
          </div>
        </div>

        <div class="item">
      <div class="container" style={{paddingTop:'20px', paddingLeft:'20px',}}>
        
      <div>
          {searchQuery && (
          <div>
            
      <h2 className="h2 result-title" style={{color:'#fff', fontSize:'25px', paddingBottom:'20px'}}>Search Results</h2>
      {venueFound ? (
        <div>
          {foundVenues && foundVenues.length > 0 ? (
            <div>
              <ul className="discover-list">
                {foundVenues.map((foundVenue) => (
                  <div className="discover-card" key={foundVenue._id}>
                    <figure className="card-img">
                      <img src={foundVenue.image} alt={foundVenue.name} loading="lazy" />
                    </figure>

                    <div className="card-content">
                      <div className="card-rating">
                        <ion-icon name="star"></ion-icon>
                        <ion-icon name="star"></ion-icon>
                        <ion-icon name="star"></ion-icon>
                        <ion-icon name="star"></ion-icon>
                        <ion-icon name="star"></ion-icon>
                      </div>

                      <p className="card-subtitle">{foundVenue.address}</p>
                      <h3 className="h3 card-title">
                        <Link to={`/data/${foundVenue._id}`}>{foundVenue.name}</Link>
                      </h3>

                      <p className="card-text">
                        {foundVenue.about.length > 80 ? foundVenue.about.slice(0, 80) + "..." : foundVenue.about}
                      </p>
                    </div>
                  </div>
                ))}
              </ul>
            </div>
          ) : (
            <p style={{ color: '#fff', paddingBottom: '20px' }}>{`No results found for "${searchQuery}"`}</p>
          )}
        </div>
      ) : (
        <p style={{ color: '#fff', paddingBottom: '20px', fontSize:'15px' }}>{`Searching for "${searchQuery}"...`}</p>
      )}
        <hr style={{color:'#fff', marginBottom:'30px', marginRight:'20px', opacity:'0.5'}}/>
            </div>
        )}
      </div>
          
          <ul className="discover-list" style={{marginRight:'10px'}}>
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
                    
                    <p className="card-text">{venueData.about.length > 80 ? venueData.about.slice(0, 80) + "..." : venueData.about}</p>
                  </div>
                </div>
            ))}
          </ul>
          <ul className="pagination">
            {renderPageNumbers}
        </ul>
    </div>
        </div>
      </div>
    </div>
  );
};

export default Discover;
