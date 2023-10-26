
// Import React and useState hook from the 'react' library.
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";// Leaflet library for creating a custom icon
import "leaflet/dist/leaflet.css";
//import Data from './Data';
//import { useParams } from "react-router-dom";
import '../css/Search.css';

const Record = (props) => (
  <tr>
    <td>{props.record.name}</td>
    <td>{props.record.address}</td>
    <td>{props.record.latitude}</td>
    <td>{props.record.longitude}</td>
    
  </tr>
);

function Search() {
    // state variables
    const [locationResult, setLocationResult] = useState('');
    const [locationCoord, setLocationCoord] = useState(null);
    const [mapReady, setMapReady] = useState(false);
    // const [searchQuery, setSearchQuery] = useState("");
    // const [searchResults, setSearchResults] = useState([]);
    const [records, setRecords] = useState([]); // Define a state variable 'record'

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

    function recordList() {   // Renders the list of records 
        return records.map((record) => {
          return (
            <Record
              record={record}
              
              key={record._id}
            />
          );
        });
      }

    // Define a function to retrieve the user's geolocation
    const getUserLocation = () => {
        // Check if the browser supports the Geolocation API
        if (navigator.geolocation) {
            // If supported, use 'getCurrentPosition' to get the user's location
            navigator.geolocation.getCurrentPosition(
                // Success callback function, receiving the 'position' object
                function (position) {
                    // Extract the latitude and longitude from 'position'
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;

                    // Update the 'locationResult' state with the user's coordinates
                    setLocationResult(`Latitude: ${latitude}, Longitude: ${longitude}`);
                    // Set user's coordinates
                    setLocationCoord([latitude, longitude]);
                    // Mark the map as ready
                    setMapReady(true);
                },
                // Error callback function, receiving an 'error' object
                function (error) {
                    // Update the 'locationResult' state with an error message
                    setLocationResult(`Error: ${error.message}`);
                    setMapReady(true);
                }
            );
        } else {
            // If Geolocation API is not supported, update 'locationResult' with an error message
            setLocationResult('Geolocation is not supported by your browser.');
        }
    };

    // Custom icon for the marker
    const icon = new L.Icon({
        iconUrl: "https://i.imgur.com/yyb78tO.png", 
        iconSize: [32, 32],
    });

    // Use useEffect to call getUserLocation when the component mounts
    useEffect(() => {
        getUserLocation();
        //fetchExistingVenues();
    }, []);
      

    // const handleSearch = async () => {
    //     try {
    //       const response = await fetch(`http://localhost:5050/search?query=${searchQuery}`);
      
    //       if (!response.ok) {
    //         const message = `An error has occurred: ${response.statusText}`;
    //         window.alert(message);
    //         return;
    //       }
      
    //       const venues = await response.json();
    //       setSearchResults(venues);
    //     } catch (error) {
    //       console.error('Error fetching venues:', error);
    //     }
    // };

    // Render the component's JSX content
    return (
        <div className="main-box">
            {/* <input
                type="text"
                placeholder="Search for a nightclub"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="action-box">
            <button onClick={handleSearch}>Click to Search</button>
            </div> */}

            {/* Display search results */} 
            {/* {searchResults.length === 0 ? (
                <div>
                    <p>No result. Check for available Nightclubs in San Marcos!</p>
                    <div className="action-box">
                    <button onClick={fetchExistingVenues}>Click to see all Clubs</button>
                    </div>
                </div>
            ) : (
            <ul>
                {searchResults.map((result, index) => (
                <li key={index}>{result.name}</li>
                ))}
            </ul>
            )}        */}

            {/* Create a button that triggers the 'getUserLocation' function when clicked */}
            <div className="action-box">
            <button onClick={getUserLocation}>Your Location:</button>
            <p id="locationResult">{locationResult}</p>
            </div>

            {/* Display the 'locationResult' state, which will show the geolocation information or error message */}
            {/*<p style={{'color':'#000000'}}id="locationResult">{locationResult}</p>*/}

            {/* Render the map with a marker */}
            {mapReady && (
                <MapContainer
                    style={{ height: "70vh", width: "100%" }}
                    center={locationCoord || [0, 0]} // Center the map at the user's geolocation or default to [0, 0]
                    zoom={15}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {locationCoord && (
                        <Marker position={locationCoord} icon={icon}>
                            <Popup>
                                Your Location <br /> Coordinates: {locationCoord[0]}, {locationCoord[1]}
                            </Popup>
                        </Marker>
                    )}        
                </MapContainer>
            )}
        <table style={{ marginTop: 20, color: '#000000' }}>
        <thead>
          <tr>
            <th className="nameColumn">Name</th>
            <th className="addressColumn">Address</th>
            <th className="nameColumn">Latitude</th>
            <th className="nameColumn">Longitude</th>
          </tr>
        </thead>
        <tbody>{recordList()}</tbody>
      </table>
        </div>
    );
}

// Export the 'Search' component to make it available for use in other parts of our application
export default Search;