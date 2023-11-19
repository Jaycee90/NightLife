import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import '../css/settings.css';
import {  ProSidebar,  Menu,  MenuItem,  SidebarFooter,  SidebarContent,} from 'react-pro-sidebar';
import { FaList, FaRegHeart } from 'react-icons/fa';
import { FiHome, FiLogOut } from 'react-icons/fi';
import { BiCog } from 'react-icons/bi';

import 'react-pro-sidebar/dist/css/styles.css';

import { useContext } from 'react';
import { UserContext } from './UserContext';

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
            return ['VibeTrack', ...prevSelectedVenues];
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

  const [menuCollapse] = useState(false);

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

  return (
    <div className="profile-component">
      <div class="grid-settings">
        <div class="grid-settings-left">
          <div id="header">
            <ProSidebar collapsed={menuCollapse}>
              <SidebarContent>
                <Menu iconShape="square"><MenuItem icon={<FiHome />}><a href={`/profile`}>Profile</a></MenuItem>
                <MenuItem icon={<BiCog />}><a href="/security">Security</a></MenuItem>
                <MenuItem icon={<FaList />}><a href={`/contact`}>Contact</a></MenuItem>
                <MenuItem active={true} icon={<FaRegHeart />}><a href={`/favorite`}>Favorite</a></MenuItem>
                </Menu>
              </SidebarContent>
              <SidebarFooter>
                <Menu iconShape="square"><MenuItem icon={<FiLogOut />} onClick={logOut}>Logout</MenuItem></Menu>
              </SidebarFooter>
            </ProSidebar>
          </div>
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
                {showFavoritesOnly ? 'Add more to my Favorites': 'Show my Favorites Only'}
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

        </div>
      </div>
    </div>
  );
}

export default Favorite;
