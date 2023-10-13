import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import '../css/edit.css';

export default function EditExtra() {
  const [form, setForm] = useState({ // Define a state variable 'form'
    _id: "",
    name: "",
    address: "",
    about: "",
    phone: "",
    website: "",
    image: "",
  });
  const params = useParams(); // Get the parameters from the URL
  const navigate = useNavigate(); // Navigate function from react-router-dom

  useEffect(() => { // Fetch venue data when component mounts or params.id changes
    async function fetchData() {
      // Send a GET request to the server with the 'id' parameter
      const id = params.id.toString(); 
      const response = await fetch(`http://localhost:5050/record/${params.id.toString()}`);

      if (!response.ok) { // Check if the response is successful
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const venue = await response.json();  // Parse the response (object in database) as JSON
      if (!venue) { // Check if a venue was found
        window.alert(`Venue with id ${id} not found`);
        navigate("/");
        return;
      }

      setForm(venue); // Update the 'venueData' state with the fetched data
    }

    fetchData();

    return;
  }, [params.id, navigate]);

  function updateForm(value) { // Function to update form state
    return setForm((prev) => {
      // Update multiple fields in the form state object without directly mutating it
      // Create a new state object by merging the previous state with the new values provided in value
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) { // Extract form fields for the request body
    e.preventDefault();
    const editedVenue = {
      _id : form._id,
      name: form.name,
      address: form.address,
      about: form.about,
      phone: form.phone,
      website: form.website,
      image: form.image,
    };
    
    // Send a PATCH request to update the venue
    await fetch(`http://localhost:5050/record/${params.id}`, {
      method: "PATCH",
      body: JSON.stringify(editedVenue),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    navigate("/recordList");
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
          <label htmlFor="id">Key ID: </label>
          <input
            type="text"
            className="form-control"
            id="id"
            value={form.id}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address: </label>
          <input
            type="text"
            className="form-control"
            id="address"
            value={form.address}
            onChange={(e) => updateForm({ address: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="about">About: </label>
          <input
            type="text"
            className="form-control"
            id="about"
            value={form.about}
            onChange={(e) => updateForm({ about: e.target.value })}
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
          <label htmlFor="website">Website: </label>
          <input
            type="text"
            className="form-control"
            id="website"
            value={form.website}
            onChange={(e) => updateForm({ website: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image URL: </label>
          <input
            type="text"
            className="form-control"
            id="image"
            value={form.image}
            onChange={(e) => updateForm({ image: e.target.value })}
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
