import React from 'react';
import '../css/discover.css';

function Test() {
    return (
        <div style={{padding:'20px'}}>
          <input 
            type="text" 
            placeholder="Search for venues... "
            style={{ backgroundColor:"#fff" , color:'#747474', paddingBottom:'10px', marginTop:'0px', borderRadius:'10px'}}
            inputProps={{ style: { backgroundColor: "#fff", color:'#747474'} }}
            />
        </div>
    );
};

export default Test;