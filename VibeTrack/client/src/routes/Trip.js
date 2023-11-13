// import React, { useEffect } from 'react';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
// import 'leaflet-routing-machine/dist/leaflet-routing-machine.js';

// function TripFinder() {
//   useEffect(() => {
//     // Initialize the Leaflet Routing Machine library
//     const router = new L.Routing.OSRMv1({
//       serviceUrl: 'https://api.osrm.io/v1'
//     });

//     // Check if the map container is already initialized
//     if (!document.getElementById('map')._leaflet_id) {
//       // Create the Leaflet map
//       const map = L.map('map').setView([29.8833, -97.9414], 13);

//       // Add a tile layer
//       L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       }).addTo(map);

//       // Create a custom icon
//       const customIcon = L.icon({
//         iconUrl: 'https://i.imgur.com/wOs7nJb.png',
//         iconSize: [32, 32], // set icon size
//         iconAnchor: [16, 32], // set anchor to half of the icon size
//         popupAnchor: [0, -32] // set popup anchor to show above the marker
//       });
  
//       // Add markers with custom icon
//       const marker1 = L.marker([28.8833, -97.9414], { icon: customIcon }).addTo(map);
//       const marker2 = L.marker([28.7433, -97.9414], { icon: customIcon }).addTo(map);
//       // Add popups to markers
//       marker1.bindPopup('Name of Venue 1.<br>Address of Venue 1.').openPopup();
//       marker2.bindPopup('Name of Venue 2.<br>Address of Venue 2.').openPopup();

//       L.marker([29.8833, -97.9414]).addTo(map)
//         .bindPopup('Name of Venues.<br> here address of venue.')
//         .openPopup();
//       // Add the routing control
//       L.Routing.control({
//         router: router,
//         waypoints: [
//           L.latLng(28.8833, -97.9414),
//           L.latLng(28.7433, -97.9414)
//         ]
//       }).addTo(map);
//     }
//   }, []);

//   return (
//     <div>
//       <p>Ready to make the dance floor jealous? Let's vibe!</p>
//       <h2>Discover venues near you</h2>
//       {/* Leaflet Map Container */}
//       <div id="map" className="leaflet-map" style={{ width: '100%', height: '400px' }}></div>
//     </div>
//   );
// }

// export default TripFinder;


import React, { useEffect, useState, useRef } from "react";
import L from "leaflet";
import {
  TileLayer,
  MapContainer,
  LayersControl
} from "react-leaflet";
import { Button } from "@material-ui/core";

import RoutingControl from './RoutingControl'

const maps = {
  base: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
};

const TripFinder = () => {
  const [map, setMap] = useState(null);
  const [start, setStart] = useState([38.9072, -77.0369])
  const [end, setEnd] = useState([37.7749, -122.4194])

  return (
    <>
      <MapContainer
        center={[37.0902, -95.7129]}
        zoom={3}
        zoomControl={false}
        style={{ height: "100vh", width: "100%", padding: 0 }}
        whenCreated={map => setMap(map)}
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
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Map">
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url={maps.base}
            />
          </LayersControl.BaseLayer>
        </LayersControl>
      </MapContainer>
    </>
  );
};

export default TripFinder;




