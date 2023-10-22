import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./realm/user";
import Homepage from "./realm/homepage";
import Login from "./realm/login";
import PrivateRoute from "./realm/private";
import Signup from "./realm/signup";
 
// We import all the components we need in our app
import Navbar from "./components/navbar";
/*
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";
import UserList from "./components/userList";
import Settings from "./components/settings";

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
import Contact from './routes/Contact';

import Test from './routes/Test';
import SearchLink from "./components/link_search"; // Import the Search component
*/

const App = () => {
  return (
    <div>
      <Navbar />
   <BrowserRouter>
     {/* We are wrapping our whole app with UserProvider so that */}
     {/* our user is accessible through out the app from any page*/}
     <UserProvider>
       <Routes>
         <Route exact path="/login" element={<Login />} />
         <Route exact path="/signup" element={<Signup />} />
         {/* We are protecting our Home Page from unauthenticated */}
         {/* users by wrapping it with PrivateRoute here. */}
         <Route element={<PrivateRoute />}>
           <Route exact path="/" element={<Homepage />} />
         </Route>
       </Routes>
     </UserProvider>
   </BrowserRouter>
      </div>
  );
};

export default App;
