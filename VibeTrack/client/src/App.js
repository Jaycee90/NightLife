import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";

import Home from './routes/Home';
import Discover from './routes/Discover';
import Data from './routes/Data'; 
import SpecialEvent from './routes/Special';
import Search from './routes/Search';
import Calendar from './routes/Calendar';
import Listing from './routes/Listing';
import Login from './routes/Login';
import Safety from './routes/Safety';
import Test from './routes/Test';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path='/discover' element={<Discover />} />
        <Route path="/data/:id" element={<Data />} />
        <Route path='/specialevent' element={<SpecialEvent/>} />
        <Route path='/calendar' element={<Calendar/>} />
        <Route path='/listing' element={<Listing/>} />
        <Route path='/search' element={<Search/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/safety' element={<Safety />} />

        <Route path='/test' element={<Test />} />

        
        <Route path='/recordlist' element={<RecordList />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/create" element={<Create />} />
      </Routes>
      </div>
  );
};

export default App;
