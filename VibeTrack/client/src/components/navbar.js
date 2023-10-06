import React from "react";
import '../css/navbar.css';

// Here, we display our Navbar
export default function Navbar() {
 return (
   <div>
       <div class = "nav" style={{'padding-bottom':'100px'}}>
            <ul class="nav-flex-row">
              <li class="nav-item"><a href="/">Home</a></li>
              <li class="nav-item"><a href="discover">Discover</a></li>
              <li class="nav-item"><a href="listing">List</a></li>
              <li class="nav-item"><a href="specialevent">Special Event</a></li>
              <li class="nav-item"><a href="recordList">Record</a></li>
              <li class="nav-item"><a href="create">Create</a></li>

              {/*
              <li class="nav-item"><a href="login">Login</a></li>
              <li class="nav-item"><a href="search">Search</a></li> 
              */}
         </ul>

         
       </div>
   </div>
 );
}