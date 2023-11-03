import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import '../css/settings.css';
import {  ProSidebar,  Menu,  MenuItem,  SidebarFooter,  SidebarContent,} from "react-pro-sidebar";
import { FaList, FaRegHeart } from "react-icons/fa";
import { FiHome, FiLogOut } from "react-icons/fi";
import { BiCog } from "react-icons/bi";

import { useContext } from 'react';
import { UserContext } from './UserContext';
import "react-pro-sidebar/dist/css/styles.css";

export default function Contact() {
  useEffect(() => {
    async function fetchData() {
      try {
        const code = await fetchUser(); // Await the fetchUser function
        const response = await fetch(`http://localhost:5050/user/${code}`);
    
        if (!response.ok) {
          const message = `An error has occurred: ${response.statusText}`;
          window.alert(message);
          return;
        }
    
        const user = await response.json();
        if (!user) {
          window.alert(`User with code ${code} not found`);
          navigate("/");
          return;
        }
    
        setForm(user);
      } catch (error) {
        console.error(error);
      }
    }
  
    fetchData();
  
  }, [navigate, fetchUser]);
  
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
    
    await fetch(`http://localhost:5050/user/${code}`, {
      method: "PATCH",
      body: JSON.stringify(editedUser),
      headers: {
        'Content-Type': 'application/json'
      },
    });
  
    // Optionally, you can show a message to indicate that the update was successful.
    window.alert("Information updated successfully!");
  }

  const [menuCollapse] = useState(false);

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
      <div class="grid-settings">
        <div class="grid-settings-left">
          <div id="header">
          <ProSidebar collapsed={menuCollapse}>
            <SidebarContent>
              <Menu iconShape="square">
                <MenuItem icon={<FiHome />}><a href={`/profile/${userCode}`}>Profile</a></MenuItem>
                <MenuItem icon={<BiCog />}><a href="/security">Security</a></MenuItem>
                <MenuItem  active={true} icon={<FaList />}>Contact</MenuItem>
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
        <div class="grid-settings-right">
          <h3 style={{ color: '#000000', paddingBottom: '10px' }}>Emergency Contacts</h3>
          <form onSubmit={onSubmit} style={{ color: '#000000' }}>
          <div className="grid-about">
            <div className="item">
              <div className="form-group">
                <label htmlFor="emergencyName1"><b>Emergency Contact #1</b> - Name: </label>
                <input
                  type="text"
                  className="form-control"
                  id="emergencyName1"
                  value={form.emergencyName1}
                  onChange={(e) => updateForm({ emergencyName1: e.target.value })}
                />
              </div>
            </div>
            <div className="item">
              <div className="form-group">
                <label htmlFor="emergencyEmail1"><b>Emergency Contact #1</b> - Email: </label>
                <input
                  type="text"
                  className="form-control"
                  id="emergencyEmail1"
                  value={form.emergencyEmail1}
                  onChange={(e) => updateForm({ emergencyEmail1: e.target.value })}
                />
              </div>
            </div>
            <div className="item">
            <div className="form-group">
                <label htmlFor="emergencyName2"><b>Emergency Contact #2</b> - Name: </label>
                <input
                  type="text"
                  className="form-control"
                  id="emergencyName2"
                  value={form.emergencyName2}
                  onChange={(e) => updateForm({ emergencyName2: e.target.value })}
                />
              </div>
            </div>
            <div className="item">
              <div className="form-group">
                <label htmlFor="emergencyEmail2"><b>Emergency Contact #2</b> - Email: </label>
                <input
                  type="text"
                  className="form-control"
                  id="emergencyEmail2"
                  value={form.emergencyEmail2}
                  onChange={(e) => updateForm({ emergencyEmail2: e.target.value })}
                />
              </div>
            </div>
            </div>
            <div className="form-group">
              <input
                type="submit"
                value="Update Information"
                className="btn btn-primary"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
