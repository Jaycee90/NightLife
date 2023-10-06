import React, { useState, useEffect } from "react";
import './Listing.css';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useParams } from "react-router-dom";

function Test(props) {
  const [venueData, setVenueData] = useState({
    name: "",
    address: "",
    latitude: 0,
    longitude: 0,
    image: "",
  });

  const params = useParams();
  const icon = L.icon({ iconUrl: "https://i.imgur.com/yyb78tO.png" });

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`http://localhost:5050/record/${params.id}`);

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const venue = await response.json();
      if (!venue) {
        window.alert(`Venue with id ${params.id} not found`);
        return;
      }

      setVenueData(venue);
    }

    fetchData();
  }, [params.id]);

  return (
    <div>
      <div className="about-section">
        <div className="item">
          <h2 className="h2 section-title" style={{ 'float': 'left', 'textAlign': 'left' }}>{venueData.name}</h2>
          <p style={{ 'float': 'left', 'textAlign': 'left', 'color': 'black', 'fontSize': '15px', 'width': '90%' }}>{venueData.address}</p>
          <p style={{ 'float': 'left', 'textAlign': 'left', 'color': 'black', 'fontSize': '15px', 'width': '90%' }}>{venueData.about}</p>
          <button style={{ 'float': 'left', 'textAlign': 'left', 'color': 'black', 'fontSize': '1.5em' }} className="btn btn-primary">Invite a Friend</button>
        </div>
        <div className="item"><img src={venueData.image} width="600px" alt="Something" style={{ 'borderRadius': '30px' }} /></div>
      </div>

      <div className="container" style={{ 'paddingTop': '25px' }}>
        <div className="grid-container">
          <div className="item1">
            {/* Your text content */}
          </div>
          <div className="item2">
            <div style={{ display: "flex" }}>
              <MapContainer
                style={{
                  height: "50vh",
                  width: "100%",
                }}
                center={[venueData.latitude, venueData.longitude]}
                zoom={15}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[venueData.latitude, venueData.longitude]} icon={icon}>
                  <Popup>
                    {venueData.name} <br /> Coordinates: {venueData.latitude}, {venueData.longitude}
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
