import React from "react";
import '../css/navbar.css';

export default function Navbar() {
 return (
   <div>
       <div class = "nav" style={{'padding-bottom':'100px'}}>
            <ul class="nav-flex-row">
              <li class="nav-item"><a href="/">Home</a></li>
              <li class="nav-item"><a href="discover">Discover</a></li>
              <li class="nav-item"><a href="favorites">Favorites</a></li>
              <li class="nav-item"><a href="specialevent">Special Event</a></li>
              <li class="nav-item"><a href="search">Search</a></li> 
              <li class="nav-item"><a href="safety">Safety</a></li> 
         </ul>

         
       </div>
   </div>
 );
}