import React, { useState } from "react";

function Safety() {
    const [clubs, setClubs] = useState([]);
    const [clubName, setClubName] = useState("");

    // Update the club entered
    const updateClubsEntered = (e) => {
        setClubName(e.target.value);
    }

    // Add the club to the list of clubs the user is going to tonight
    const handleClubEntered = () => {
        setClubs((prevClubs) => [...prevClubs, clubName]);
        setClubName("");
    }    
    console.log(clubs);
    return (
        <div style={{'color':'#000000'}}>
            <h1>Whats to come in sprint 2!</h1>
            <div>
                <h3>Coming soon!</h3>
                <p>
                    Select the clubs you are going tonight, and our app will send a notification of the clubs you choose to a contact of your choosing
                </p>
                <p>Enter the clubs you are going to tonight here!</p>
                <input 
                    type="text"
                    placeholder="Enter club names"
                    value={clubName}
                    onChange={updateClubsEntered}
                />
                <button onClick={handleClubEntered}>Submit club</button>
                <ul>
                    {clubs.map((club, index) => (
                        <li key={index}>{club}</li>
                     ))}
                </ul>


            </div>
        </div>
    );
}

export default Safety;
