//initial commit

import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>404 Not Found</h2>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/home">
        <button style={{ padding: '10px', marginTop: '10px' }}> Go to Home</button>
      </Link>
    </div>
  );
};

export default NotFound;
