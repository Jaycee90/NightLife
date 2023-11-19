import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import UserBar from '../components/userbar.js';
import '../css/settings.css';
import 'react-pro-sidebar/dist/css/styles.css';

import { useContext } from 'react';
import { UserContext } from './UserContext';
import { useNavigate } from "react-router";

function Favorite() {
  const [venues, setVenues] = useState([]);
  const [selectedVenues, setSelectedVenues] = useState([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(true);
  const [favoriteVenues, setFavoriteVenues] = useState([]);

  useEffect(() => {
    const getVenues = async () => {
      try {
        const response = await fetch(`http://localhost:5050/record/`);

        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          window.alert(message);
          return;
        }

        const venueData = await response.json();
        setVenues(venueData);

        setSelectedVenues((prevSelectedVenues) => {
          if (!prevSelectedVenues.includes('VibeTrack')) {
            return [...prevSelectedVenues];
          }
          return prevSelectedVenues;
        });
      } catch (error) {
        console.log('Error fetching venues from the database, ', error);
      }
    };
    getVenues();
  }, []);

  const toggleFavoritesDisplay = () => {
    setShowFavoritesOnly(!showFavoritesOnly);
  };

  const addToFavorites = (venue) => {
    if (!selectedVenues.includes(venue.name)) {
      setSelectedVenues([...selectedVenues, venue.name]);
      setFavoriteVenues([...favoriteVenues, venue.name]);
    }
  };

  const removeFromFavorites = (venue) => {
    setSelectedVenues(selectedVenues.filter((v) => v !== venue));
  };


  const { logOutUser } = useContext(UserContext);
  const logOut = async () => {
    try {
      const loggedOut = await logOutUser();
      if (loggedOut) {
        window.location.reload(true);
      }
    } catch (error) {
      alert(error);
    }
  };

  const allVenues = selectedVenues.join(',');

  const [form, setForm] = useState({
    _id: "",
    code: "",
    name: "",
    lastName: "",
    phone: "",
    email: "",
    birthdate: "",
    gender: "",
    emergencyName1: "", 
    emergencyEmail1: "", 
    emergencyName2: "", 
    emergencyEmail2: "", 
    favorite: "",
  });
  const navigate = useNavigate();

  const { fetchUser } = useContext(UserContext);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUser = await fetchUser();
        if (currentUser) {
          const response = await fetch(`http://localhost:5050/user/${currentUser.id}`);
    
          if (!response.ok) {
            const message = `An error has occurred: ${response.statusText}`;
            window.alert(message);
            return;
          }
    
          const user = await response.json();
          if (!user) {
            window.alert(`User with code ${currentUser.id} not found`);
            navigate("/");
            return;
          }
    
          setForm(user);
        }
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
  
    fetchData();
  }, [fetchUser, navigate]);
  
  async function onSubmit(e) {
    e.preventDefault();
    const editedUser = {
      _id : form._id,
      code: form.code,
      name: form.name,
      lastName: form.lastName,
      phone: form.phone,
      email: form.email,
      birthdate: form.birthdate,
      gender: form.gender,
      emergencyName1: form.emergencyName1,
      emergencyEmail1: form.emergencyEmail1,
      emergencyName2: form.emergencyName2,
      emergencyEmail2: form.emergencyEmail2,
      favorite: allVenues,
    };
  
    const currentUser = await fetchUser();
    await fetch(`http://localhost:5050/user/${currentUser.id}`, { // Use currentUser directly
      method: "PATCH",
      body: JSON.stringify(editedUser),
      headers: {
        'Content-Type': 'application/json'
      },
    });
  
    // Optionally, you can show a message to indicate that the update was successful.
    window.alert("Information updated successfully!");
  }

  return (
    <div className="profile-component">
      <div class="grid-settings">
        <div class="grid-settings-left">
          <UserBar  logOut={logOut}/>
        </div>
        <div class="grid-settings-right" style={{ marginTop: '20px' }}>
          <h3 style={{ color: '#000000', paddingBottom: '10px' }}>
            Favorite Venues
          </h3>

          <div className="grid-favorite" style={{paddingBottom:'10px'}}>
            <div class="item">
              {showFavoritesOnly && (
                <div>
                  <select id="venueDropdown" onChange={(e) => addToFavorites({ name: e.target.value })}>
                    <option value="" disabled selected>Select a venue...</option>
                    {venues.map((venue, index) => (<option key={index} value={venue.name}>{venue.name}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            <div class="item">
              <button onClick={toggleFavoritesDisplay} style={{backgroundColor: '#e24e99',color: '#fff'}}>
                {showFavoritesOnly ? 'Show my Favorites Only':'Add more to my Favorites'}
              </button>
            </div>
          </div>

          <ul>
            {selectedVenues.map((venue, index) => (
              <li key={index} style={{backgroundColor: '#fff',borderRadius: '10px',border: '1px solid #7a7a7a',color: '#747474', height: '40px',paddingTop: '10px',marginRight: '10px',marginBottom: '10px',paddingLeft: '10px'}}>
                {venue}
                <div style={{ display: 'inline-block', marginBottom: '20px', marginRight: '10px', float: 'right', }}>
                  <FontAwesomeIcon icon={faHeart}onClick={() => removeFromFavorites(venue)} style={{ cursor: 'pointer' }}/>
                </div>
              </li>
            ))}
          </ul>
          <div>
              <button  onClick={onSubmit} style={{backgroundColor: '#e24e99',color: '#fff'}}>Save my Favorites
              </button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Favorite;
