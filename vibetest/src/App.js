import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './Routes/Home';
import RouteOne from './Routes/RouteOne';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/routeone' element={<RouteOne />} />
      </Routes>
    </Router>
  );
}

export default App;
