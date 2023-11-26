// Import React and useState hook from the 'react' library.
import React from "react";
import "leaflet/dist/leaflet.css";
import '../css/search.css';

// eslint-disable-next-line
const Record = (props) => {
  function trimAddress(address) {
    const trimmedAddress = address.replace(/^(.*?)\s\w{2}\s\d{5}$/, '$1').replace(/,\s*$/, '');

    return trimmedAddress.trim();
  }
  const trimmedAddress = trimAddress(props.record.address);

  return (
    <tr>
      <td>{props.record.name}</td>
      <td>{trimmedAddress}</td>
    </tr>
  );
};

function Test() {
    return (
    <div>
        <p className="section-subtitle">Ready to make the dance floor jealous? Let's vibe!</p>
        <h2 className="h2 section-title">Discover venues near you</h2>
    
        <div className="search-container">
        <div className="grid-button">
            <div class="item">
            <input
                type="text"
                placeholder="Search by venue name"
                style={{ borderRadius: "10px", height: "40px", background: '#fff', color: '#747474' }}
            />
            </div>
            <div class="item">
            <button style={{ borderRadius: "10px", height: "40px", marginTop: '4px' }}>Find venues near me</button>
            </div>
            <div class="item"><button style={{ borderRadius: "10px", height: "40px", marginTop: '4px' }}>Search by name</button></div>
        </div>
        </div>
        <div>
    
        <div className="grid-map" style={{ padding: '10px' }}>
            <p style={{color:'#000'}}>CONTAINER 1 </p>
        </div>

        <div className="grid-map" style={{ padding: '10px' }}>
            <p style={{color:'#000'}}>CONTAINER 2 </p>
        </div>
        </div>
    </div>
    );
          
}
export default Test;