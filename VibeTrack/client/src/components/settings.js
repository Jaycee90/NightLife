import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import '../css/edit.css';

export default function Settings() {
  const [form, setForm] = useState({ // Define a state variable 'form'
    _id: "",
    id: "",
    nameF: "",
    nameL: "",
    phone: "",
    email: "",
    birthdate: "",
    gender: "",
    emergency1: "",
    emergency2: "",
  });
  const params = useParams(); // Get the parameters from the URL
  const navigate = useNavigate(); // Navigate function from react-router-dom

  useEffect(() => { // Fetch user data when component mounts or params.id changes
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
      nameF: form.nameF,
      nameL: form.nameL,
      phone: form.phone,
      email: form.email,
      birthdate: form.birthdate,
      gender: form.gender,
      emergency1: form.emergency1,
      emergency2: form.emergency2,
    };
    
    // Send a PATCH request to update the venue
    await fetch(`http://localhost:5050/user/${params.user}`, {
      method: "PATCH",
      body: JSON.stringify(editedUser),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    navigate("/userList");
  }

  return (
    <div>
      <h3 style={{ color: '#000000', paddingBottom: '10px' }}>Update Venue</h3>
      <form onSubmit={onSubmit} style={{ color: '#000000' }}>
      <div className="form-group">
          <label htmlFor="_id">_ID: (Read Only) </label>
          <input
            type="text"
            className="form-control"
            id="_id"
            value={form._id}
            readOnly // Add the readOnly attribute here
          />
        </div>
        <div className="form-group">
          <label htmlFor="nameF">First Name: </label>
          <input
            type="text"
            className="form-control"
            id="nameF"
            value={form.nameF}
            onChange={(e) => updateForm({ nameF: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="nameL">Last Name: </label>
          <input
            type="text"
            className="form-control"
            id="nameL"
            value={form.nameL}
            onChange={(e) => updateForm({ nameL: e.target.value })}
          />
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
          <label htmlFor="phone">Phone: </label>
          <input
            type="text"
            className="form-control"
            id="phone"
            value={form.phone}
            onChange={(e) => updateForm({ phone: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="birthdate">Birthdate: </label>
          <input
            type="text"
            className="form-control"
            id="birthdate"
            value={form.birthdate}
            onChange={(e) => updateForm({ birthdate: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender: </label>
          <input
            type="text"
            className="form-control"
            id="gender"
            value={form.gender}
            onChange={(e) => updateForm({ gender: e.target.value })}
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
            value="Update Venue"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
