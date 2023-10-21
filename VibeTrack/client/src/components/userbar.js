import React from "react";
import '../css/navbar.css';

export default function Userbar() {
 return (
   <div>
       <div class = "nav" style={{'padding-bottom':'100px'}}>
            <ul class="nav-flex-row">
              <li class="nav-item"><a href="/">Settings</a></li>
              <li class="nav-item"><a href="/">Contacts</a></li>
              <li class="nav-item"><a href="/">Favorite</a></li>
         </ul>
       </div>
   </div>
 );
}