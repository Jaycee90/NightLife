import React, { useState } from "react";
import '../css/Discover.css';

function Search() {
    const [locationResult, setLocationResult] = useState('');

    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    setLocationResult(`Latitude: ${latitude}, Longitude: ${longitude}`);
                },
                function (error) {
                    setLocationResult(`Error: ${error.message}`);
                }
            );
        } else {
            setLocationResult('Geolocation is not supported by your browser.');
        }
    };

    return (
        <div>
            <button onClick={getUserLocation}>Get My Location</button>
            <p id="locationResult">{locationResult}</p>
        </div>
    );
}

export default Search;
