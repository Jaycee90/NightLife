import React, { useState } from "react";

function Safety() {
    // Instead of entering clubs might create a view where users can see all club names and click each
    // club they are visiting tha night
    const [clubs, setClubs] = useState([]); // Array of clunb names
    // Hold club names and a fucntion to set the club name
    const [clubName, setClubName] = useState(""); // temp holder for club name

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
            <h1>Safety First</h1>
            <div>
                <h3>Current Date will go here</h3> 
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
