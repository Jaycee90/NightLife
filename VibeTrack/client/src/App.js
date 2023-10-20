import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";
import Settings from "./components/settings";
import UserList from "./components/userList";

import Home from './routes/Home';
import Discover from './routes/Discover';
import Data from './routes/Data'; 
import SpecialEvent from './routes/Special';
import Search from './routes/Search';
import Calendar from './routes/Calendar';
import Template from './routes/Template';
import Login from './routes/Login';
import Safety from './routes/Safety';
import Profile from './routes/Profile';

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
        <Route path='/template' element={<Template/>} />
        <Route path='/search' element={<Search/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/safety' element={<Safety />} />

        <Route path='/test/:id' element={<Test />} />
        <Route path='/profile' element={<Profile />} />
        
        <Route path='/recordlist' element={<RecordList />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/create" element={<Create />} />
        <Route path='/settings/:user' element={<Settings />} />
        <Route path='/userList/user' element={<UserList />} />
      </Routes>
      </div>
  );
};

export default App;
