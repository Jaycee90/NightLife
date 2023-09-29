import React from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
  } from 'https://cdn.esm.sh/react-leaflet'

function Listing() {
    return (
        <div>
            <h1>This is the Vibetrack Listing.</h1>
            <h2>Find all the clubs near you here!! enjoy your night</h2>
            <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[51.505, -0.09]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default Listing;