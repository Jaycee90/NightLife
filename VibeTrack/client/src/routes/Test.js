import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import '../css/settings.css';

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
       
    </div>
  );
}
