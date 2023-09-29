import React from "react";
import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
function Listing() {
    
  return(
    <div style={{ display: "flex" }}>
      <MapContainer
        style={{
          height: "100vh",
          width: "100%",
        }}
        center={[31.432026740690574, 120.8439179532812]}
        zoom={8}
      >
        {/* Add Google Maps tile URL */}
        <TileLayer
          attribution="Google Maps"
          url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
        />
      </MapContainer>
    </div>
  );

};

export default Listing;