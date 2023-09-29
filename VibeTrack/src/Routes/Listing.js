import React from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function Listing() {
    const locationCoord = [29.8833, -97.9414];
    
  return(
    <div style={{ display: "flex" }}>
      <MapContainer
        style={{
          height: "100vh",
          width: "100%",
        }}
        center={[29.8833, -97.9414]}
        zoom={8}
      >
        {/* Add Google Maps tile URL */}
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[29.8833, -97.9414]}>
            <Popup>
            Your Location <br /> Coordinates: {locationCoord[0]}, {locationCoord[1]}
            </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Listing;