// import React, { useEffect, useState, useRef } from "react";
import React from "react";
//import L from "leaflet";
import {TileLayer, MapContainer, LayersControl} from "react-leaflet";
//import { Button } from "@material-ui/core";
import RoutingControl from './RoutingControl'

const maps = {
  base: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
};

const TripFinder = () => {
  // const [map, setMap] = useState(null);
  // const [start, setStart] = useState([29.8822, -97.9414])
  // const [end, setEnd] = useState([30.2500, -97.7500])

  return (
    <>
      <MapContainer
        center={[29.8822, -97.9414]}
        zoom={3}
        zoomControl={false}
        style={{ height: "100vh", width: "100%", padding: 0 }}
        //whenCreated={map => setMap(map)}
        whenCreated={map => {
          // You can use map directly if needed
          console.log("Map created:", map);
        }}
      >
        {/* *************** */}
        {/* Pass in our custom control layer here, inside of the map container */}
        {/* *************** */}
        <RoutingControl 
          position={'topright'} 
          // start={start} 
          // end={end} 
          start={[29.8822, -97.9414]} 
          end={[30.2500, -97.7500]} 
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




