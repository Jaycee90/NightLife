import React from "react";
import '../css/navbar.css';

export default function Navbar() {
 return (
   <div className="navbar-content" >
      <div class="navigation-bar">
        <a href="/" class="split"><img src="https://i.imgur.com/KIpIJ7M.png" alt="Logo" loading="lazy" style={{ height:"30px"}} /></a>
        
        {/*eslint-disable-next-line*/} 
        <a> 
        <form action="/test">
          <input 
            type="text" 
            placeholder="Search for venues... "
            style={{ backgroundColor:"#fff" , color:'#747474', paddingBottom:'10px', marginTop:'0px', borderRadius:'10px'}}
            inputProps={{ style: { backgroundColor: "#fff", color:'#747474'} }}
            />
        </form>
        </a>
        <a href="specialevent">Special Event</a>
        <a href="search">Search</a>
        <a href="tripfinder">Trip Finder</a>
        <a href="invitation">Invitation</a>
        <a href="safety">Safety</a>
        <a href="discover">Discover</a>
        
       
      </div>
    </div>
 );
}