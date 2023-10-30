
// Import React and useState hook from the 'react' library.
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";// Leaflet library for creating a custom icon
import "leaflet/dist/leaflet.css";
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
    const [records, setRecords] = useState([]); 
    const [searchQuery, setSearchQuery] = useState('');//state variable to hold the search query.
    const [venueFound, setVenueFound] = useState(false);
    const [foundVenueLocation, setFoundVenueLocation] = useState(null);

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

    // Render the component's JSX content
    function findNearestClubs(userLatitude, userLongitude, numClubs = 10) {
        const distances = records.map((record) => {
            const latDiff = userLatitude - record.latitude;
            const lonDiff = userLongitude - record.longitude;
            const distance = Math.sqrt(latDiff * latDiff + lonDiff * lonDiff);
            return { record, distance };
        });

        const sortedRecords = distances.sort((a, b) => a.distance - b.distance).slice(0, numClubs);
        return sortedRecords.map((entry) => entry.record);
    }

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
            setFoundVenueLocation([foundVenue.latitude, foundVenue.longitude]);
        } else {
            setVenueFound(false);
        }
    };

    // Display the user's location marker by default or when no search is performed
    const defaultMarker = locationCoord && !venueFound && !searchQuery && (
        <Marker position={locationCoord} icon={icon}>
            <Popup>Your Location</Popup>
        </Marker>
    );
          

    return (
        <div className="main-box">
            <p className="para">Ready to make the dance floor jealous? Let's vibe!</p>
            <div className="action-box">
            <button onClick={searchVenue}>Search</button>
            </div>
            
            {/**prompt a user to search */}
            <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search by venue name"
            />

            {/* Display search result message */}
            {searchQuery && (
                <p>
                    {venueFound
                        ? `Heading to ${searchQuery}`
                        : `Venue "${searchQuery}" not found`}
                </p>
            )}

            {/* Create a button that triggers the 'getUserLocation' function when clicked */}
            <div className="action-box">
            <button onClick={getUserLocation}>Your Location:</button>
            <p id="locationResult">{locationResult}</p>
            </div>

                        {/* Display the top 10 closest clubs */}
                        {locationCoord && (
                <div>
                    <h2 className="nearMe">Top 10 Closest Clubs</h2>
                    <table style={{ marginTop: 20, color: '#000000' }}>
                        <thead>
                            <tr>
            <th className="nameColumn">Name</th>
            <th className="addressColumn">Address</th>
            <th className="nameColumn">Latitude</th>
            <th className="nameColumn">Longitude</th>
                            </tr>
                        </thead>
                        <tbody>
                            {findNearestClubs(locationCoord[0], locationCoord[1]).map((record) => (
                                <Record
                                    record={record}
                                    key={record._id}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Render the map with the found venue marker or user's location */}
            {mapReady && (
                <MapContainer
                    style={{ height: "70vh", width: "100%" }}
                    center={
                        foundVenueLocation ? foundVenueLocation : locationCoord || [0, 0]
                    }
                    zoom={15}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {foundVenueLocation ? (
                        <Marker position={foundVenueLocation} icon={icon}>
                            <Popup>{`Heading to ${searchQuery}`}</Popup>
                        </Marker>
                    ) : locationCoord && (
                        <Marker position={locationCoord} icon={icon}>
                            <Popup>Your Location</Popup>
                        </Marker>
                    )}
                </MapContainer>
            )}



        </div>
    );
}

export default Search;