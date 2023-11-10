import React, { useState, useEffect } from "react";
import '../css/search.css';

function Search() {
    const [records, setRecords] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [venueFound, setVenueFound] = useState(false);
    const [foundVenueDetails, setFoundVenueDetails] = useState(null);

    useEffect(() => {
        async function getRecords() {
            const response = await fetch(`http://localhost:5050/record/`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const records = await response.json();
            setRecords(records);
        }

        getRecords();
    }, []);

    const searchVenue = () => {
        const foundVenue = records.find(record =>
            record.name.toLowerCase() === searchQuery.toLowerCase()
        );

        if (foundVenue) {
            setFoundVenueDetails({
                name: foundVenue.name,
                address: foundVenue.address,
            });
            setVenueFound(true);
        } else {
            setVenueFound(false);
            setFoundVenueDetails(null);
        }
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <div>
            <p className="section-subtitle">Ready to make the dance floor jealous? Let's vibe!</p>
            <h2 className="h2 section-title">Discover venues near you</h2>

            <div className="search-container">
                <div className="grid-button">
                    <div class="item">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearch}
                            placeholder="Search by venue name"
                            style={{ borderRadius: "10px", height: "40px", background: '#fff', color: '#747474' }}
                        />
                    </div>
                    <div class="item">
                        <button onClick={searchVenue} style={{ borderRadius: "10px", height: "40px", marginTop: '4px' }}>Find venues</button>
                    </div>
                </div>
            </div>

            <div className="grid-map" style={{ padding: '10px', color:'#000'}}>
                <div class="item">
                {searchQuery && (
                    <div >
                        {venueFound ? (
                            <div>
                                <p>{`Heading to ${searchQuery}`}</p>
                                {foundVenueDetails && (
                                    <div style={{ padding: '10px', color:'#000'}}>
                                        <h3 >Details of {searchQuery}</h3>
                                        <p>Name: {foundVenueDetails.name}</p>
                                        <p>Address: {foundVenueDetails.address}</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <p>{`Venue "${searchQuery}" not found`}</p>
                        )}
                    </div>
                )}
                </div>
            </div>
        </div>
    );
}

export default Search;
