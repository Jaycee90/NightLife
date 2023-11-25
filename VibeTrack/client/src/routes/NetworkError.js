import React from 'react';
import { Link } from 'react-router-dom';
import '../css/NotFound.css';

const NetworkError = () => {
  return (
    <div className="not-found-container">
      <h2 className="not-found-title">404 Not Found</h2>
      <p className="not-found-message">Oops! Looks like you followed a bad link. If you think this is a problem with us, please tell us.</p>
      <Link to="/">
        <button className="not-found-button">Return to Homepage</button>
      </Link>
    </div>
  );
};

export default NetworkError;
