import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import '../css/settings.css';
import { ProSidebar, Menu, MenuItem, SidebarFooter, SidebarContent } from "react-pro-sidebar";
import { FaList, FaRegHeart } from "react-icons/fa";
import { FiHome, FiLogOut } from "react-icons/fi";
import { BiCog } from "react-icons/bi";
import { useContext } from 'react';
import { UserContext } from './UserContext';
import "react-pro-sidebar/dist/css/styles.css";

export default function Profile() {
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
  

  function updateForm(value) {
    return setForm(prev => {
      return { ...prev, ...value };
    });
  }
  
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

  const [menuCollapse] = useState(false)
  
  const { logOutUser } = useContext(UserContext);
  const logOut = async () => {
    try {
      const loggedOut = await logOutUser();
      if (loggedOut) {
        window.location.reload(true);
      }
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div className="profile-component">
    <div className="grid-settings">
      <div className="grid-settings-left">
        <div id="header">
          <ProSidebar collapsed={menuCollapse}>
            <SidebarContent>
              <Menu iconShape="square">
                <MenuItem active={true} icon={<FiHome />}>Profile</MenuItem>
                <MenuItem icon={<BiCog />}><a href="/security">Security</a></MenuItem>
                <MenuItem icon={<FaList />}><a href={`/contact`}>Contacts</a></MenuItem>
                <MenuItem icon={<FaRegHeart />}>Favorite</MenuItem>
              </Menu>
            </SidebarContent>
            <SidebarFooter>
              <Menu iconShape="square">
                <MenuItem icon={<FiLogOut />}  onClick={logOut}>Logout</MenuItem>
              </Menu>
            </SidebarFooter>
          </ProSidebar>
        </div>
      </div>
      <div className="grid-settings-right">
        <h3 style={{ color: '#000000', paddingBottom: '10px' }}>General Information</h3>
        <form onSubmit={onSubmit} style={{ color: '#000000' }}>
          <div className="grid-about">
            <div className="item">
              <div className="form-group">
                <label htmlFor="name">First Name: </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={form.name}
                  onChange={(e) => updateForm({ name: e.target.value })}
                />
              </div>
            </div>
            <div className="item">
              <div className="form-group">
                <label htmlFor="lastName">Last Name: </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  value={form.lastName}
                  onChange={(e) => updateForm({ lastName: e.target.value })}
                />
              </div>
            </div>
            <div className="item">
              <div className="form-group">
                <label htmlFor="gender" style={{ color: 'black' }}>Gender: </label>
                <select
                  className="form-control"
                  id="gender"
                  value={form.gender}
                  onChange={(e) => updateForm({ gender: e.target.value })}
                  style={{ backgroundColor: '#8a8a8a', borderRadius: '15px', marginTop:'4px', color: 'white', height: '40px', padding: '10px', paddingLeft: '30px', width: '100%', fontSize: '17px' }}
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Rather not disclose">Rather not disclose</option>
                </select>
              </div>
            </div>
            <div className="item">
              <div className="form-group">
                <label htmlFor="phone">Phone: </label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  value={form.phone}
                  onChange={(e) => updateForm({ phone: e.target.value })}
                />
              </div>
            </div>
            <div className="item">
              <div className="form-group">
                <label htmlFor="birthdate">Birthdate: </label>
                <input
                  type="date"
                  className="form-control"
                  id="birthdate"
                  value={form.birthdate}
                  onChange={(e) => updateForm({ birthdate: e.target.value })}
                  style={{ backgroundColor: '#8a8a8a', borderRadius: '15px', color: 'white', height: '40px', padding: '10px', marginTop:'4px', paddingLeft: '30px', width: '100%', fontSize: '17px' }}
                />
              </div>
            </div>
            <div className="item">
              <div className="form-group">
                <label htmlFor="_id">ID (Read Only): </label>
                <input
                  type="text"
                  className="form-control"
                  id="_id"
                  value={form._id}
                  readOnly
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email" style={{marginLeft:'10px'}}>Email: </label>
            <input
              type="text"
              className="form-control"
              id="email"
              value={form.email}
              onChange={(e) => updateForm({ email: e.target.value })}
              style={{marginLeft:'10px'}}
            />
          </div>
          <br />
          <div className="form-group">
            <input
              type="submit"
              value="Update Information"
              className="btn btn-primary"
              style={{width:'50%', marginLeft:'30%'}}
            />
          </div>
        </form>
      </div>
    </div>
  </div>
  );
}