import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.js';

function TripFinder() {
  useEffect(() => {
    // Initialize the Leaflet Routing Machine library
    const router = new L.Routing.OSRMv1({
      serviceUrl: 'https://api.osrm.io/v1'
    });

    // Check if the map container is already initialized
    if (!document.getElementById('map')._leaflet_id) {
      // Create the Leaflet map
      const map = L.map('map').setView([29.8833, -97.9414], 13);

      // Add a tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      // Add the routing control
      L.Routing.control({
        router: router,
        waypoints: [
          L.latLng(51.505, -0.09),
          L.latLng(51.51, -0.1)
        ]
      }).addTo(map);
    }
  }, []); // Empty dependency array ensures the effect runs once on mount

  return (
    <div>
      <p>Ready to make the dance floor jealous? Let's vibe!</p>
      <h2>Discover venues near you</h2>
      {/* Leaflet Map Container */}
      <div id="map" className="leaflet-map" style={{ width: '100%', height: '400px' }}></div>
    </div>
  );
}

export default TripFinder;
