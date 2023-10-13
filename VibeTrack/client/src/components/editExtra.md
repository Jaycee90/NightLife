import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import '../css/edit.css';

export default function Edit() {
  const [form, setForm] = useState({ // Define a state variable 'form'
    _id: "",
    name: "",
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: "",
    sunday: "",
    facebook: "",
    twitter: "",
    instagram: "",
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
      monday: form.monday,
      tuesday: form.tuesday,
      wednesday: form.wednesday,
      thursday: form.thursday,
      friday: form.friday,
      saturday: form.saturday,
      sunday: form.sunday,
      facebook: form.facebook,
      twitter: form.twitter,
      instagram: form.instagram,
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
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.name}
            readOnly // Add the readOnly attribute here
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Monday: </label>
          <input
            type="text"
            className="form-control"
            id="address"
            value={form.monday}
            onChange={(e) => updateForm({ address: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="about">Tuesday: </label>
          <input
            type="text"
            className="form-control"
            id="about"
            value={form.tuesday}
            onChange={(e) => updateForm({ about: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Wednesday: </label>
          <input
            type="text"
            className="form-control"
            id="phone"
            value={form.wednesday}
            onChange={(e) => updateForm({ phone: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="website">Thursday: </label>
          <input
            type="text"
            className="form-control"
            id="website"
            value={form.thursday}
            onChange={(e) => updateForm({ website: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Friday: </label>
          <input
            type="text"
            className="form-control"
            id="image"
            value={form.friday}
            onChange={(e) => updateForm({ image: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Saturday: </label>
          <input
            type="text"
            className="form-control"
            id="image"
            value={form.saturdya}
            onChange={(e) => updateForm({ image: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Sunday: </label>
          <input
            type="text"
            className="form-control"
            id="image"
            value={form.sunday}
            onChange={(e) => updateForm({ image: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Facebook: </label>
          <input
            type="text"
            className="form-control"
            id="image"
            value={form.facebook}
            onChange={(e) => updateForm({ image: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Twitter: </label>
          <input
            type="text"
            className="form-control"
            id="image"
            value={form.twitter}
            onChange={(e) => updateForm({ image: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Instagram: </label>
          <input
            type="text"
            className="form-control"
            id="image"
            value={form.instagram}
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
