import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../css/discover.css';
import Fuse from 'fuse.js';

const Discover = () => {
  const [venueData, setVenueData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  
  const [records, setRecords] = useState([]);

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
    window.scrollTo({ top: 0, behavior: 'smooth' });

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

  useEffect(() => { 
    async function getRecords() { // Define an function to fetch data
      // Send a GET request to the server 
      const response = await fetch(`http://localhost:5050/record/`);

      if (!response.ok) { // Check if the response is successful
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json(); // Parse the response (object in database) as JSON

      setRecords(records);  // Update the 'record' state with the fetched data
    }

    getRecords();  // Call fetchData function

    return;
  }, [records.length]);

    const [searchQuery, setSearchQuery] = useState('');
    const [venueFound, setVenueFound] = useState(false);
    const [foundVenueDetails, setFoundVenueDetails] = useState(null);

    useEffect(() => {
        async function getRecords() {
            const response = await fetch(`http://localhost:5050/record/`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const records = await response.json();
            setRecords(records);
        }

        getRecords();
    }, []);
    const searchVenue = () => {
      const fuse = new Fuse(records, {
          keys: ['name'],
          includeScore: true,
          threshold: 0.3, // Adjust this threshold based on your preference
      });
  
      const searchResults = fuse.search(searchQuery);
  
      if (searchResults.length > 0) {
          const foundVenue = searchResults[0].item;
          setFoundVenueDetails({
              name: foundVenue.name,
              address: foundVenue.address,
              about: foundVenue.about,
              image: foundVenue.image,
          });
          setVenueFound(true);
      } else {
          setVenueFound(false);
          setFoundVenueDetails(null);
      }
  };
  
    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };
  
  return (
    <div className="discover-component" style={{marginBottom:'40px'}}>
      <p className="section-subtitle" >Discover all nightclubs and venues in the San Marcos area </p>
      <h2 className="h2 section-title">Discover venues</h2>
      <div className="grid-discover-search">

        <div class="item" style={{marginLeft:'10px'}}>
          <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search by venue name"
              style={{ borderRadius: "10px", height: "40px", background: '#fff', color: '#747474' }}
          />
        <button onClick={searchVenue} style={{ borderRadius: "10px", height: "40px", marginTop: '4px' }}>Find venues</button>

        </div>

        <div class="item">
      <div class="container" style={{paddingTop:'20px', paddingLeft:'20px',}}>
        
      <div>
          {searchQuery && (
          <div>
            
      <h2 className="h2 result-title" style={{color:'#fff', fontSize:'25px', paddingBottom:'20px'}}>Search Results</h2>
              {venueFound ? (
                  <div>
                      {foundVenueDetails && (
                          <div>
                            
          <ul className="discover-list" >
                <div className="discover-card">
                  <figure className="card-img">
                    <img src={foundVenueDetails.image} alt={foundVenueDetails.name} loading="lazy" />
                  </figure>

                  <div className="card-content">
                    <div className="card-rating">
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                    </div>

                    <p className="card-subtitle">{foundVenueDetails.address}</p>
                    <h3 className="h3 card-title"><Link to={`/data/${foundVenueDetails._id}`}>{foundVenueDetails.name}</Link></h3>
                    
                    <p className="card-text">{foundVenueDetails.about.length > 80 ? foundVenueDetails.about.slice(0, 80) + "..." : foundVenueDetails.about}</p>
                  </div>
                </div></ul>
                                    </div>
                                    
                                )}
                            </div>
                        ) : (
                            <p style={{color:'#fff', paddingBottom:'20px'}}>{`Searching for "${searchQuery}"...`}</p>
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
