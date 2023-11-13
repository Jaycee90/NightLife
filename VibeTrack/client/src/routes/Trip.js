import React from "react";
import {TileLayer, MapContainer, LayersControl, Marker} from "react-leaflet";
import RoutingControl from './RoutingControl';
import L from "leaflet";

const maps = {
  base: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
};

const TripFinder = () => {
  const start = [29.8822, -97.9414];
  const end = [30.2500, -97.7500];

  // Custom icon for the starting point marker
  const userMarker = new L.Icon({
    iconUrl: 'https://i.imgur.com/wOs7nJb.png', // URL to the custom marker image
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  // Custom icon for the end point marker
  const venueMarker = new L.Icon({
    //iconUrl: "https://i.imgur.com/yyb78tO.png", 
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    });

  return (
    <>
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
        
        {/* Add Marker for Start Position */}
        <Marker position={start} icon={userMarker} draggable={true}>
          {/* You can customize the marker icon here */}
        </Marker>

        {/* Add Marker for End Position */}
        <Marker position={end} icon={venueMarker} draggable={true}>
          {/* You can customize the marker icon here */}
        </Marker>


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




