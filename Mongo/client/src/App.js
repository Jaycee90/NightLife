import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";

import Home from './Routes/Home';
import Discover from './Routes/Discover';
import RouteOne from './Routes/RouteOne'; 
import SpecialEvent from './Routes/Special';
import Search from './Routes/Search';
import Calendar from './Routes/Calendar';
import Listing from './Routes/Listing';
import Login from './Routes/Login';

const App = () => {
  return (
    <div>
      <Navbar />
      <div style={{ margin: 20 }}>
      <Routes>
        <Route exact path="/" element={<RecordList />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/create" element={<Create />} />
        <Route path='/home' element={<Home />} />
        <Route path='/discover' element={<Discover />} />
        <Route path="/routeone/:name" element={<RouteOne />} />
        <Route path='/specialevent' element={<SpecialEvent/>} />
        <Route path='/calendar' element={<Calendar/>} />
        <Route path='/listing' element={<Listing/>} />
        <Route path='/search' element={<Search/>} />
        <Route path='/login' element={<Login />} />
      </Routes>
      </div>
    </div>
  );
};

export default App;
