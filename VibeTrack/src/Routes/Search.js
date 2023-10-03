import React from "react";
import './Discover.css';

function Search() {
    return (
        <div>
            <div class = "nav" style={{'padding-bottom':'100px'}}>
            <ul class="nav-flex-row">
                <li class="nav-item"><a href="discover">Discover</a></li>
                <li class="nav-item"><a href="listing">List</a></li>
                <li class="nav-item"><a href="search">Search</a></li>
                <li class="nav-item"><a href="specialevent">Special Event</a></li>
                <li class="nav-item"><a href="login">Login</a></li>
            </ul>
        </div>
            <h1 style={{'color':'#000000'}}>This is a test of the Search</h1>
        </div>
    );
};

export default Search;