import React from "react";
import '../css/navbar.css';

export default function Navbar() {
 return (
   <div className="navbar-content" >
      <div class="navigation-bar" style={{marginBottom:"20px"}}>
        <a href="home" class="split"><img src="https://i.imgur.com/SoHE2tO.png" alt="Logo" loading="lazy" style={{ height:"30px"}} /></a>
        <a href="login">Login</a>
        <a href="specialevent">Special Event</a>
        <a href="search">Search</a>
        <a href="safety">Safety</a>
        <a href="discover">Discover</a>
      </div>
    </div>
 );
}