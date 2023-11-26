
// Import React and useState hook from the 'react' library.
import React, { useState, useEffect } from "react";
import L from "leaflet"; // Leaflet library for creating a custom icon
import "leaflet/dist/leaflet.css";
import '../css/search.css';
import {TileLayer, MapContainer, LayersControl, Marker, Popup} from "react-leaflet";
import RoutingControl from './RoutingControl';
import { useParams } from "react-router-dom";

const maps = {
  base: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
};
  
const Record = (props) => {
  function trimAddress(address) {
    const trimmedAddress = address.replace(/^(.*?)\s\w{2}\s\d{5}$/, '$1').replace(/,\s*$/, '');

    return trimmedAddress.trim();
  }
  const trimmedAddress = trimAddress(props.record.address);

  return (
    <tr>
      <td>{props.record.name}</td>
      <td>{trimmedAddress}</td>
    </tr>
  );
};

function Test() {
  // State to track the current view
  const [currentView, setCurrentView] = useState("nearMe");
  // Initialize state variables.
  const [locationResult, setLocationResult] = useState('');
  const [locationCoord, setLocationCoord] = useState(null);
  const [mapReady, setMapReady] = useState(false);
  const [records, setRecords] = useState([]);
  // eslint-disable-next-line
  const [searchQueryLocation, setSearchQueryLocation] = useState(''); // state variable to hold the search query.
  // eslint-disable-next-line
  const [venueFoundLocation, setVenueFoundLocation] = useState(false);
  // eslint-disable-next-line
  const [foundVenueLocation, setFoundVenueLocation] = useState(null);

  // Use the useHistory hook from React Router to access the history object
  // eslint-disable-next-line

  useEffect(() => {
    async function getRecords() {
      // Define an function to fetch data
      // Send a GET request to the server
      const response = await fetch(`http://localhost:5050/record/`);

      if (!response.ok) {
        // Check if the response is successful
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json(); // Parse the response (object in the database) as JSON

      setRecords(records); // Update the 'record' state with the fetched data
    }

    getRecords(); // Call fetchData function

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

  // Use useEffect to call getUserLocation when the component mounts
  useEffect(() => {
    getUserLocation();
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


  const userMarker = new L.Icon({
    iconUrl: 'https://i.imgur.com/wOs7nJb.png', // URL to the custom marker image
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  // Display the user's location marker by default or when no search is performed
  const defaultMarker = locationCoord && !venueFoundLocation && !searchQueryLocation && (
    <Marker position={locationCoord} icon={userMarker}>
      <Popup>Your Location</Popup>
    </Marker>
  );

  // Custom icon for the marker
  const icon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  // Function to get the top 10 closest clubs' markers
  const getTopClubsMarkers = (userLatitude, userLongitude) => {
    const nearestClubs = findNearestClubs(userLatitude, userLongitude, 10);
    return nearestClubs.map((club, index) => (
      <Marker key={index} position={[club.latitude, club.longitude]} icon={icon}>
        <Popup>
          {club.image.length > 0 && <img src={club.image[0]} alt={club.name} style={{ width: "100%" }} />}
          <p><strong>{club.name}</strong><br />
            {club.address}<br />
            {club.website && (<a href={club.website} target="_blank" rel="noopener noreferrer">Visit our Website</a>)}
          </p>
        </Popup>
      </Marker>
    ));
  };

  function calculateMedianCoordinates(userLatitude, userLongitude, closestVenues) {
    const allLatitudes = [userLatitude, ...closestVenues.map(venue => venue.latitude)];
    const allLongitudes = [userLongitude, ...closestVenues.map(venue => venue.longitude)];

    const sortedLatitudes = allLatitudes.sort((a, b) => a - b);
    const sortedLongitudes = allLongitudes.sort((a, b) => a - b);

    const medianLatitude = sortedLatitudes[Math.floor(sortedLatitudes.length / 2)];
    const medianLongitude = sortedLongitudes[Math.floor(sortedLongitudes.length / 2)];

    return [medianLatitude, medianLongitude];
    }

    //TRIP FINDER
    const { venueName } = useParams();

  useEffect(() => {
    // Fetch data based on venueName
    console.log("Fetching data for venue:", venueName);
  }, [venueName]);
  
  // State variables
  const [tripRecords, setTripRecords] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [start, setStartLocation] = useState(null); // User's location
  const [foundVenueLocationName, setFoundVenueName] = useState(null);
  const [searchQueryName, setSearchQueryName] = useState('');//state variable to hold the search query
  const [shouldRenderMap, setShouldRenderMap] = useState(true); //keeps track of whether the map should re-render

  // Fetch trip records from the server
  const fetchTripRecords = async () => {
    try {
      const response = await fetch(`http://localhost:5050/record/`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const tripData = await response.json();
      setTripRecords(tripData);
  
      // Create markers for each venue
      const venueMarkers = tripData.map((trip) => ({
        position: [trip.latitude, trip.longitude],
        popupContent: (
          <div>
            {/* Display the first image in the popup */}
            {trip.image.length > 0 && <img src={trip.image[0]} alt={trip.name} style={{ width: "100%" }} />}
            <p><strong>{trip.name}</strong><br />
            {trip.address}<br/>
            {trip.website && (
              <a href={trip.website} target="_blank" rel="noopener noreferrer">
                Visit our Website
              </a>
            )}
            </p>
          </div>
        ),
      }));
      setMarkers(venueMarkers);
  
    } catch (error) {
      console.error("Error fetching trip records:", error.message);
    }
  };

  // Extract the user's coordinates and set then to start point
  const setStartLocationToUser = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setStartLocation([latitude, longitude]);// Set user's location as the start location
          setFoundVenueName([latitude, longitude]);
        },
        (error) => {
          console.error("Error getting user location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };
  
  useEffect(() => {
    setStartLocationToUser(); // Call the function to set start location to user's current position
    fetchTripRecords(); // Call the function to fetch trip records
  }, []);

  // Function to update the search query
  const handleSearchName = (event) => {
    setSearchQueryName(event.target.value);
  };

  // Function to search for a specific venue by name
  const searchVenue = () => {
    const foundVenue = tripRecords.find(record =>
      record.name.toLowerCase() === searchQueryName.toLowerCase()
    );
  
    if (foundVenue) {
      setFoundVenueName([foundVenue.latitude, foundVenue.longitude]);
      setShouldRenderMap(!shouldRenderMap); 
    }
  };
  
  const venueMarker = new L.Icon({
    iconUrl: 'https://i.imgur.com/wOs7nJb.png', // URL to the custom marker image
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
  return (
    <div>
      <p className="section-subtitle">Ready to make the dance floor jealous? Let's vibe!</p>
      <h2 className="h2 section-title">Discover venues near you</h2>

      <div className="search-container">
        <div className="grid-button">
          <div class="item">
          <input
              type="text"
              value={searchQueryName}
              onChange={handleSearchName}
              placeholder="Search by venue name"
              style={{borderRadius:"10px", height:"40px", background:'#fff', color:'#747474'}}
            />
          </div>
          <div class="item">
            {/* Set the current view state when "Find venues near me" is clicked */}
            <button onClick={() => setCurrentView("nearMe")} style={{ borderRadius: "10px", height: "40px", marginTop: '4px' }}>Find venues near me</button>
          </div>
          <div class="item">
            {/* Set the current view state when "Search by name" is clicked */}
            <button onClick={() => { setCurrentView("searchName"); searchVenue();  }} style={{ borderRadius: "10px", height: "40px", marginTop: '4px' }}>Search by name</button>
          </div>
        </div>
      </div>

      <div>
        {/* Conditionally render CONTAINER 1 or CONTAINER 2 based on the current view state */}
        {currentView === "nearMe" && (
          <div className="grid-map" style={{ padding: '10px' }}>
            <div class="item">
            {locationCoord && (
                <div>
                <h2 style={{ color: '#000000' }}>Take a dip at these venues that are closest to you</h2>
    
                <p id="locationResult" style={{ color: '#000', opacity: '0' }}>{locationResult}</p>
                {searchQueryLocation && (
                    <p style={{ color: '#000', opacity: '0' }}>
                    {venueFoundLocation
                        ? `${searchQueryLocation}`
                        : `Venue "${searchQueryLocation}" not found`}
                    </p>
                )}
                <table style={{ color: '#000000' }}>
                    <thead>
                    <tr>
                        <th className="nameColumn">Name</th>
                        <th className="addressColumn">Address</th>
                    </tr>
                    </thead>
                    <tbody>
                    {findNearestClubs(locationCoord[0], locationCoord[1]).map((record) => (
                        <Record record={record} key={record._id}
                        />
                    ))}
                    </tbody>
                </table>
                </div>
            )}
    
            </div>
            <div class="item">
            {/* Render the map with markers for the found venue, user's location, and top 10 closest clubs */}
            {mapReady && (
                <MapContainer style={{ height: "71vh", width: "100%" }}
                // Find center between user's coordinates and top 10 closest clubs' coordinates
                center={calculateMedianCoordinates(locationCoord[0], locationCoord[1], findNearestClubs(locationCoord[0], locationCoord[1], 10))}
                zoom={13}
                >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {defaultMarker}
                {foundVenueLocation && (
                    <Marker position={foundVenueLocation} icon={icon}>
                    <Popup>{searchQueryLocation}</Popup>
                    </Marker>
                )}
                {locationCoord && !venueFoundLocation && !searchQueryLocation && getTopClubsMarkers(locationCoord[0], locationCoord[1])}
                </MapContainer>
            )}
    
            </div>
        </div>
        )}

        {currentView === "searchName" && (
          <div>
            <MapContainer
        key={shouldRenderMap} // Add a key to trigger a re-render when the key changes
        center={[29.8833, -97.9414]}
        zoom={13}
        zoomControl={false}
        style={{ height: "100vh", width: "100%", padding: 0 }}
        
        whenCreated={map => {
          console.log("Map created:", map);
        }}
      >
        {/* *************** */}
        {/* Pass in our custom control layer here, inside of the map container */}
        {/* *************** */}

        {/* Render venue markers on the map */}
        {markers.map((marker, index) => (
          <Marker key={index} position={marker.position} icon={venueMarker}>
            <Popup>{marker.popupContent}</Popup>
          </Marker>
        ))}

        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Map">
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url={maps.base}
            />
          </LayersControl.BaseLayer>
        </LayersControl>
        {/* Conditional rendering of RoutingControl */}
        {start && foundVenueLocationName && (
          <RoutingControl 
            position={'topleft'} 
            start={start} 
            end={foundVenueLocationName} 
            color={'#757de8'}
          />
        )}
      </MapContainer>
          </div>
        )}
      </div>
    </div>
  );
}

export default Test;
