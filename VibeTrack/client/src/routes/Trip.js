import React, { useState, useEffect } from "react";
import {TileLayer, MapContainer, LayersControl, Marker, Popup} from "react-leaflet";
import RoutingControl from './RoutingControl';
import L from "leaflet";

const maps = {
  base: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
};

const TripFinder = () => {
  // State variables
  const [tripRecords, setTripRecords] = useState([]);
  const [markers, setMarkers] = useState([]);

  const [start, setStartLocation] = useState(null); // User's location
  //const [end, setEndLocation] = useState([29.8833, -97.9414]); // Default end location to connet the initial route
  const [end, setEndLocation] = useState("");
  
  

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

  const setStartLocationToUser = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setStartLocation([latitude, longitude]);// Set user's location as the start location
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

  
  const venueMarker = new L.Icon({
    iconUrl: 'https://i.imgur.com/wOs7nJb.png', // URL to the custom marker image
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const handleRouting = () => {
    // Use the end location directly if it's not a string (already coordinates)
    if (typeof end === 'string') {
      // Find the venue in your database using the end string
      const foundVenue = tripRecords.find(venue => venue.name.toLowerCase() === end.toLowerCase());
  
      if (foundVenue) {
        // Use the found venue's coordinates as the end location
        const newEndLocation = [foundVenue.latitude, foundVenue.longitude];
        setEndLocation(newEndLocation);
      } else {
        console.error("Venue not found in the database");
        // Handle the case where the venue is not found in the database
      }
    } else {
      setEndLocation(end);
    }
  
    // Optionally, trigger route calculation and map update
    // Your additional logic here...
  };
  
  
  return (
    <>
      <p className="section-subtitle" >Ready to make the dance floor jealous? Let's vibe!</p>
      <h2 className="h2 section-title">Party time! Hit the road, let's roll!</h2>
      {/* Input for setting end location */}
      <div>
        <label htmlFor="endLocation">Set End Location: </label>
        <input
          type="text"
          id="endLocation"
          value={end}
          onChange={(event) => setEndLocation(event.target.value)}
          placeholder="Type venue name for end location"
        />
        <button onClick={handleRouting}>Set as End Location</button>
      </div>
      
      <MapContainer
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
        {start && (
          <RoutingControl 
            position={'topleft'} 
            start={start} 
            end={end} 
            color={'#757de8'}
            onRouting={handleRouting}
          />
        )}
      </MapContainer>
      
      {/* Render trip records on the page */}
      <div>
        <h2 style={{color: '#000000'}}>San Marcos Trip Records</h2>
        
        <table style={{ color: '#000000' }}>
          <thead>
            <tr>
              <th className="nameColumn">Name</th>
              <th className="addressColumn">Address</th>
            </tr>
          </thead>
          <tbody>
            {tripRecords.map((trip) => (
              <tr key={trip._id}>
                <td>{trip.name}</td>
                <td>{trip.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </>
  );
};

export default TripFinder;




