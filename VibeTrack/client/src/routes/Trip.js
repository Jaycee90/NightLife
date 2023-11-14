//import React from "react";
import React, { useState, useEffect } from "react";


import {TileLayer, MapContainer, LayersControl} from "react-leaflet";
import RoutingControl from './RoutingControl';

const maps = {
  base: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
};

const TripFinder = () => {
  // New state variable for trip records
  const [tripRecords, setTripRecords] = useState([]); 

    // Fetch trip records from the database when the component mounts
    useEffect(() => {
      async function fetchTripRecords() {
        try {
          const response = await fetch(`http://localhost:5050/record/`);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const tripData = await response.json();
          setTripRecords(tripData);
        } catch (error) {
          console.error("Error fetching trip records:", error.message);
        }
      }
  
      fetchTripRecords(); // Call the function to fetch trip records
    }, []); // Empty dependency array ensures this useEffect runs only once on mount

  const start = [29.8822, -97.9414];
  const end = [30.2500, -97.7500];

  return (
    <>
      <p className="section-subtitle" >Ready to make the dance floor jealous? Let's vibe!</p>
      <h2 className="h2 section-title">Party time! Hit the road, let's roll!</h2>
      <MapContainer
        center={[29.8822, -97.9414]}
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
          position={'topright'} 
          start={start} 
          end={end} 
          // start={[29.8822, -97.9414]} 
          // end={[30.2500, -97.7500]} 
          color={'#757de8'} 
        />


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
        <ul style={{color: '#000000'}}>
          {tripRecords.map((trip) => (
            <li key={trip._id}>{trip.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default TripFinder;




