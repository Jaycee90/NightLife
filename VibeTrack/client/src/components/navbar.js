import React from "react";
import '../css/navbar.css';

export default function Navbar() {
 return (
   <div className="navbar-content" >
      <div class="navigation-bar">
        <a href="/" class="split"><img src="https://i.imgur.com/KIpIJ7M.png" alt="Logo" loading="lazy" style={{ height:"30px"}} /></a>
        <a href="profile">Profile</a>
        <a href="favorites">Favorite</a>
        <a href="specialevent">Special Event</a>
        <a href="search">Search</a>
        <a href="invitation">Invitation</a>
        <a href="safety">Safety</a>
        <a href="discover">Discover</a>
      </div>
    </div>
 );
}