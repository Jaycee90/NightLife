
// Import React and useState hook from the 'react' library.
import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import '../css/search.css';


function Search() {
    // state variables
    const [records, setRecords] = useState([]); 
    const [searchQuery, setSearchQuery] = useState('');//state variable to hold the search query.
    const [setVenueFound] = useState(false);

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

    // Function to update the search query
    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    // Function to search for a specific venue by name
    const searchVenue = () => {
        const foundVenue = records.find(record =>
            record.name.toLowerCase() === searchQuery.toLowerCase()
        );
    
        if (foundVenue) {
            setVenueFound(true);
            alert("Found location");
        } else {
            setVenueFound(false);
        }
    };

      

    return (
        <div>
        <p className="section-subtitle" >Ready to make the dance floor jealous? Let's vibe!</p>
        <h2 className="h2 section-title">Discover venues near you</h2>
        
        <div className="search-container">
            <div className="grid-button">
                <div class="item">{/**prompt a user to search */} 
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearch}
                        placeholder="Search by venue name"
                        style={{borderRadius:"10px", height:"40px", background:'#fff', color:'#747474'}}
                    />
                </div>                
                <div class="item"><button onClick={searchVenue} style={{borderRadius:"10px",  height:"40px", marginTop:'4px'}}>Find route</button></div>

                <div class="item"><button onClick={searchVenue} style={{borderRadius:"10px",  height:"40px", marginTop:'4px'}}>Find route</button></div>
            </div>
        </div>
        <div>

        </div>
        </div>
    );
}
export default Search;