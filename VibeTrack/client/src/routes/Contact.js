import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import '../css/settings.css';
import {  ProSidebar,  Menu,  MenuItem,  SidebarFooter,  SidebarContent,} from "react-pro-sidebar";
import { FaList, FaRegHeart } from "react-icons/fa";
import { FiHome, FiLogOut } from "react-icons/fi";
import { BiCog } from "react-icons/bi";

import { useContext } from 'react';
import { UserContext } from '../realm/UserContext';
import "react-pro-sidebar/dist/css/styles.css";
export default function Contact() {
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
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const code = params.code;
      const response = await fetch(`http://localhost:5050/user/${params.code}`);

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
    }

    fetchData();
  }, [params.code, navigate]);

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
      emergency1: form.emergency1,
      emergency2: form.emergency2,
    };
    
    await fetch(`http://localhost:5050/user/${params.code}`, {
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
    <div>
      <div class="grid-settings">
        <div class="grid-settings-left">
          <div id="header">
            <ProSidebar collapsed={menuCollapse}>
              <SidebarContent>
                <Menu iconShape="square">
                  <MenuItem icon={<FiHome />}>Profile</MenuItem>
                  <MenuItem icon={<BiCog />}>Security</MenuItem>
                  <MenuItem active={true} icon={<FaList />}>Contacts</MenuItem>
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
          <h3 style={{ color: '#000000', paddingBottom: '10px' }}>General Information</h3>
          <form onSubmit={onSubmit} style={{ color: '#000000' }}>
            <div class="grid-about">
              {form.emergency1.map((value, index) => (
                <div key={index} className="form-group">
                  <label htmlFor={`emergency1Name${index}`}>Emergency Contact 1 Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    id={`emergency1Name${index}`}
                    value={value}
                    onChange={e => {
                      const updatedEmergency1 = [...form.emergency1];
                      updatedEmergency1[index] = e.target.value;
                      updateForm({ ...form, emergency1: updatedEmergency1 });
                    }}
                  />
                </div>
              ))}

              {form.emergency2.map((value, index) => (
                <div key={index} className="form-group">
                  <label htmlFor={`emergency2Name${index}`}>Emergency Contact 2 Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    id={`emergency2Name${index}`}
                    value={value}
                    onChange={e => {
                      const updatedEmergency2 = [...form.emergency2];
                      updatedEmergency2[index] = e.target.value;
                      updateForm({ ...form, emergency2: updatedEmergency2 });
                    }}
                  />
                </div>
              ))}
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
