import React from 'react';
import { Link } from 'react-router-dom';

const NetworkError = () => {
  return (
    <div  style={{backgroundImage:'url(https://i.imgur.com/VO79Out.png)',  backgroundPosition: 'right', backgroundSize: 'cover', height: '60vh'}}>
    <div className="not-found-container" style={{margin: '20vh 10vw', textAlign: 'center', padding: '40px', borderRadius: '8px', maxWidth: '500px', width: '100%', fontFamily: 'Segoe UI'}}>
      <h2 className="not-found-title" style={{fontSize: '2em', color: '#747474', fontFamily: 'Segoe UI', padding: '20px'}}>Network Error</h2>
      <p className="not-found-message" style={{ fontFamily: 'Segoe UI', color: '#747474', padding: '20px' }}>Oops! It seems there was a problem connecting to the network, please try another page.</p>
      <Link to="/">
        <button className="not-found-button" style={{ fontFamily: 'Segoe UI', padding: '10px', marginTop: '10px', backgroundColor: '#e24e99', color: '#fff' }}>Return to Homepage</button>
      </Link>
    </div>
    </div>
  );
};

export default NetworkError;

