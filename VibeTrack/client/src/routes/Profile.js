import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import '../css/settings.css';
//import useState hook to create menu collapse state
//import react pro sidebar components
import {  ProSidebar,  Menu,  MenuItem,  SidebarFooter,  SidebarContent,} from "react-pro-sidebar";
//import icons from react icons
import { FaList, FaRegHeart } from "react-icons/fa";
import { FiHome, FiLogOut } from "react-icons/fi";
import { BiCog } from "react-icons/bi";

//import sidebar css from react-pro-sidebar module and our custom css 
import "react-pro-sidebar/dist/css/styles.css";
export default function Profile() {
  const [form, setForm] = useState({ // Define a state variable 'form'
    _id: "",
    name: "",
    lastName: "",
    phone: "",
    email: "",
    birthdate: "",
    gender: "",
    emergency1: "",
    emergency2: "",
  });
  const params = useParams(); // Get the parameters from the URL
  const navigate = useNavigate(); // Navigate function from react-router-dom

  useEffect(() => { // Fetch user data when component mounts or params.user changes
    async function fetchData() {
      // Send a GET request to the server with the 'id' parameter
      const id = params.user.toString(); 
      const response = await fetch(`http://localhost:5050/user/${params.user.toString()}`);

      if (!response.ok) { // Check if the response is successful
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const user = await response.json();  // Parse the response (object in database) as JSON
      if (!user) { // Check if a user was found
        window.alert(`User with id ${id} not found`);
        navigate("/");
        return;
      }

      setForm(user); // Update the 'userData' state with the fetched data
    }

    fetchData();

    return;
  }, [params.user, navigate]);

  function updateForm(value) { // Function to update form state
    return setForm((prev) => {
      // Update multiple fields in the form state object without directly mutating it
      // Create a new state object by merging the previous state with the new values provided in value
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) { // Extract form fields for the request body
    e.preventDefault();
    const editedUser = {
      _id : form._id,
      name: form.name,
      lastName: form.lastName,
      phone: form.phone,
      email: form.email,
      birthdate: form.birthdate,
      gender: form.gender,
      emergency1: form.emergency1,
      emergency2: form.emergency2,
    };
    
    // Send a PATCH request to update the user
    await fetch(`http://localhost:5050/user/${params.user}`, {
      method: "PATCH",
      body: JSON.stringify(editedUser),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    navigate("/userList");
  }

  const [menuCollapse] = useState(false)
  return (
    <div>
        <div class="grid-settings">
            <div class = "grid-settings-left">

            <div id="header">
          {/* collapsed props to change menu size using menucollapse state */}
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
              <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
            </div>
            <div class = "grid-settings-right">
            <h3 style={{ color: '#000000', paddingBottom: '10px' }}>General Information</h3>
      <form onSubmit={onSubmit} style={{ color: '#000000' }}>
        <div class="grid-about">
            <div class="item">
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
            <div class="item">
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
                    style={{ backgroundColor: '#747474', borderRadius: '25px', color: 'white', height: '40px', padding: '10px', paddingLeft:'30px', width: '100%', fontSize:'17px'}}
                >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Rather not disclose">Rather not disclose</option>
                </select>
            </div>

            </div>

            <div class="item">
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
                        style={{ backgroundColor: '#747474', borderRadius: '25px', color: 'white', height: '40px', padding: '10px', paddingLeft:'30px', width: '100%', fontSize:'17px'}}
                    />
                </div>
            </div>
            <div class="item">
                <div className="form-group">
                <label htmlFor="_id">ID (Read Only): </label>
                <input
                    type="text"
                    className="form-control"
                    id="_id"
                    value={form._id}
                    readOnly
                />
            </div></div>
            
            </div>
            <div className="form-group">
            <label htmlFor="email">Email: </label>
            <input
                type="text"
                className="form-control"
                id="email"
                value={form.email}
                onChange={(e) => updateForm({ email: e.target.value })}
            />
            </div>
            <div className="form-group">
            <label htmlFor="emergency1">Emergency Contact #1: </label>
            <input
                type="text"
                className="form-control"
                id="emergency1"
                value={form.emergency1}
                onChange={(e) => updateForm({ emergency1: e.target.value })}
            />
            </div>
            <div className="form-group">
                <label htmlFor="emergency2">Emergency Contact #2: </label>
                <input
                    type="text"
                    className="form-control"
                    id="emergency2"
                    value={form.emergency2}
                    onChange={(e) => updateForm({ emergency2: e.target.value })}
                />
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
