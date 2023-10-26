import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import '../css/settings.css';
import { ProSidebar, Menu, MenuItem, SidebarFooter, SidebarContent } from "react-pro-sidebar";
import { FaList, FaRegHeart } from "react-icons/fa";
import { FiHome, FiLogOut } from "react-icons/fi";
import { BiCog } from "react-icons/bi";

import { useContext } from 'react';
import { UserContext } from '../realm/UserContext';
import "react-pro-sidebar/dist/css/styles.css";
export default function Profile() {
  const [form, setForm] = useState({
    _id: "",
    name: "",
    lastName: "",
    phone: "",
    email: "",
    birthdate: "",
    gender: "",
    emergency1: ["", ""], // Initialize as an array with two empty strings
    emergency2: ["", ""], // Initialize as an array with two empty strings
  });

  const params = useParams();

  useEffect(() => {
    async function fetchData() {
      const code = params.code.toString();
      const response = await fetch(`http://localhost:5050/user/profile/${params.code}`);

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const user = await response.json();
      if (!user) {
        window.alert(`User with code ${code} not found`);
        return;
      }

      setForm(user);
    }

    fetchData();
  }, [params.code]);


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
    <div>
      <div className="grid-settings">
        <div className="grid-settings-left">
          <div id="header">
            <ProSidebar collapsed={menuCollapse}>
              <SidebarContent>
                <Menu iconShape="square">
                  <MenuItem active={true} icon={<FiHome />}>Profile</MenuItem>
                  <MenuItem icon={<BiCog />}>Security</MenuItem>
                  <MenuItem icon={<FaList />}>Contacts</MenuItem>
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
          <h3 style={{ color: '#000000', paddingBottom: '10px' }}>{form.name}</h3>
        </div>
      </div>
    </div>
  );
}
