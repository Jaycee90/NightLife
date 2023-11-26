import React from 'react';
import { Link } from 'react-router-dom';
import '../css/NetworkError.css'; 

const NetworkError = () => {
  return (
    <div className="network-error-container">
      <h2 className="network-error-title">Network Error</h2>
      <p className="network-error-message">Oops! It seems there was a problem connecting to the network.</p>
      <Link to="/">
        <button className="network-error-button">Return to Homepage</button>
      </Link>
    </div>
  );
};

export default NetworkError;

