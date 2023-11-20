import React from 'react';
import { Link } from 'react-router-dom';
import '../css/NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h2 className="not-found-title">404 Not Found</h2>
      <p className="not-found-message">Sorry, the page you are looking for does not exist.</p>
      <Link to="/">
        <button className="not-found-button">Go to Home</button>
      </Link>
    </div>
  );
};

export default NotFound; 