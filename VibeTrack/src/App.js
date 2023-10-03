import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './Routes/Home';
import Discover from './Routes/Discover';
import RouteOne from './Routes/RouteOne'; 
import SpecialEvent from './Routes/Special';
import Search from './Routes/Search';
import Calendar from './Routes/Calendar';
import Listing from './Routes/Listing';
import Login from './Routes/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/discover' element={<Discover />} />
        <Route path='/routeone/:name' element={<RouteOne />} /> 
        <Route path='/specialevent' element={<SpecialEvent/>} />
        <Route path='/calendar' element={<Calendar/>} />
        <Route path='/listing' element={<Listing/>} />
        <Route path='/search' element={<Search/>} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
