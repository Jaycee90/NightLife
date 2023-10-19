// Import React and useState hook from the 'react' library
import React, { useState } from "react";
// Import the CSS styles for the component
import '../css/Discover.css';

// Define a functional component called 'Search'
function Search() {
    // Define a state variable 'locationResult' and a function to update it, 'setLocationResult'
    const [locationResult, setLocationResult] = useState('');

    // Define a function to retrieve the user's geolocation
    const getUserLocation = () => {
        // Check if the browser supports the Geolocation API
        if (navigator.geolocation) {
            // If supported, use 'getCurrentPosition' to get the user's location
            navigator.geolocation.getCurrentPosition(
                // Success callback function, receiving the 'position' object
                function (position) {
                    // Extract the latitude and longitude from 'position'
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    
                    // Update the 'locationResult' state with the user's coordinates
                    setLocationResult(`Latitude: ${latitude}, Longitude: ${longitude}`);
                },
                // Error callback function, receiving an 'error' object
                function (error) {
                    // Update the 'locationResult' state with an error message
                    setLocationResult(`Error: ${error.message}`);
                }
            );
        } else {
            // If Geolocation API is not supported, update 'locationResult' with an error message
            setLocationResult('Geolocation is not supported by your browser.');
        }
    };

    // Render the component's JSX content
    return (
        <div>
            {/* Create a button that triggers the 'getUserLocation' function when clicked */}
            <button onClick={getUserLocation}>Get My Location</button>
            
            {/* Display the 'locationResult' state, which will show the geolocation information or error message */}
            <p style={{'color':'#000000'}}id="locationResult">{locationResult}</p>
        </div>
    );
}

// Export the 'Search' component to make it available for use in other parts of your application
export default Search;
