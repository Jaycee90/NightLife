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
import Data from './Routes/Data'; 
import SpecialEvent from './Routes/Special';
import Search from './Routes/Search';
import Calendar from './Routes/Calendar';
import Listing from './Routes/Listing';
import Login from './Routes/Login';
import Safety from './Routes/Safety';

import Test from './Routes/Test';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path='/discover' element={<Discover />} />
        <Route path="/data/:name" element={<Data />} />
        <Route path='/specialevent' element={<SpecialEvent/>} />
        <Route path='/calendar' element={<Calendar/>} />
        <Route path='/listing' element={<Listing/>} />
        <Route path='/search' element={<Search/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/safety' element={<Safety />} />
        <Route path='/test/:name' element={<Test />} />

        
        <Route path='/recordlist' element={<RecordList />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/create" element={<Create />} />
      </Routes>
      </div>
  );
};

export default App;
