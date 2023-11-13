import React from "react";
import {TileLayer, MapContainer, LayersControl} from "react-leaflet";
import RoutingControl from './RoutingControl';
//import L from "leaflet";

const maps = {
  base: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
};

const TripFinder = () => {
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
    </>
  );
};

export default TripFinder;




