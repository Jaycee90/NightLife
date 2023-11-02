import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import '../css/Template.css';

function Favorites() { // Change the function name to "Favorites"
    const [venueData, setVenueData] = useState({
        name: "",
        address: "",
        about: "",
        website: "",
        phone: 0,
    });

    const [favoriteVenues, setFavoriteVenues] = useState([]); // Add state for favorite venues

    const params = useParams();

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`http://localhost:5050/record/${params.id}`);

            if (!response.ok) {
                const message = `An error has occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }
            const venue = await response.json();
            if (!venue) {
                window.alert(`Venue with id ${params.id} not found`);
                return;
            }
            setVenueData(venue);
        }

        fetchData();
    }, [params.id]);

    // Function to add the current venue to favorites
    const addToFavorites = () => {
        setFavoriteVenues([...favoriteVenues, venueData.name]);
    };

    return (
        <div>
            <div className="about-section">
                <div className="item">
                    <h2 className="h2 section-title" style={{ 'float': 'left', 'textAlign': 'left' }}>{venueData.name}</h2>
                    <p style={{ 'float': 'left', 'textAlign': 'left', 'color': 'black', 'fontSize': '15px', 'width': '90%' }}>{venueData.address}</p>
                    <p style={{ 'float': 'left', 'textAlign': 'left', 'color': 'black', 'fontSize': '15px', 'width': '90%' }}>{venueData.about}</p>
                    <button onClick={addToFavorites} style={{ 'float': 'left', 'textAlign': 'left', 'color': 'black', 'fontSize': '1.5em' }} className="btn btn-primary">Add to Favorites</button>
                </div>
            </div>
        </div>
    );
}

export default Favorites;
