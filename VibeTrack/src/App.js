import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './Routes/Home';
import RouteOne from './Routes/RouteOne';
import SpecialEvent from './Routes/Special';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/routeone' element={<RouteOne />} />
        <Route path='/specialevent' element={<SpecialEvent/>} />
      </Routes>
    </Router>
  );
}

export default App;
