import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './Routes/Home';
import RouteOne from './Routes/RouteOne';
import SpecialEvent from './Routes/Special';
import Search from './Routes/Search';
import Calendar from './Routes/Calendar';
import Listing from './Routes/Listing';
import Login from './Routes/Login';

import "leaflet/dist/leaflet.css";
import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/routeone' element={<RouteOne />} />
        <Route path='/specialevent' element={<SpecialEvent/>} />
        <Route path='/calendar' element={<Calendar/>} />
        <Route path='/listing' element={<Listing/>} />
        <Route path='/search' element={<Search/>} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
  );

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

}

export default App;
