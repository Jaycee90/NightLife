import React, { useState, useEffect } from "react";
import {TileLayer, MapContainer, LayersControl, Marker, Popup} from "react-leaflet";
import RoutingControl from './RoutingControl';
import L from "leaflet";

const maps = {
  base: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
};

const TripFinder = () => {
  // New state variable for trip records
  const [tripRecords, setTripRecords] = useState([]);
  const [markers, setMarkers] = useState([]);

  const [start, setStartLocation] = useState([29.8822, -97.9414]); // Default start location
  const [end, setEndLocation] = useState([29.8822, -97.9514]); // Default end location 


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
            {trip.address}</p>
          </div>
        ),
      }));
      setMarkers(venueMarkers);

      // Update end location based on user input or geocoding
      setEndLocation([37.4224, -122.1667]);
  
    } catch (error) {
      console.error("Error fetching trip records:", error.message);
    }
  };
  
  useEffect(() => {
    // Requesting user location permission and setting the start location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setStartLocation([latitude, longitude]); // Set start location to the user's current position
      }, (error) => {
        console.error("Error getting user location:", error.message);
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  
    fetchTripRecords(); // Call the function to fetch trip records
  }, []);

  const venueMarker = new L.Icon({
    iconUrl: 'https://i.imgur.com/wOs7nJb.png', // URL to the custom marker image
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  return (
    <>
      <p className="section-subtitle" >Ready to make the dance floor jealous? Let's vibe!</p>
      <h2 className="h2 section-title">Party time! Hit the road, let's roll!</h2>
      <MapContainer
        center={[29.8822, -97.9514]}
        zoom={3}
        zoomControl={false}
        style={{ height: "71vh", width: "100%", padding: 0 }}
        
        whenCreated={map => {
          console.log("Map created:", map);
        }}
      >
        {/* *************** */}
        {/* Pass in our custom control layer here, inside of the map container */}
        {/* *************** */}
        <RoutingControl 
          position={'topleft'} 
          start={start} 
          end={end} 
          color={'#757de8'} 
        />

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




