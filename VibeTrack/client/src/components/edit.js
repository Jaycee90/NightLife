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
    instagram: "",
    yelp: "",
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
      instagram: form.instagram,
      yelp: form.yelp,
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
            id="monday"
            value={form.monday}
            onChange={(e) => updateForm({ monday: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="about">Tuesday: </label>
          <input
            type="text"
            className="form-control"
            id="tuesday"
            value={form.tuesday}
            onChange={(e) => updateForm({ tuesday: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Wednesday: </label>
          <input
            type="text"
            className="form-control"
            id="wednesday"
            value={form.wednesday}
            onChange={(e) => updateForm({ wednesday: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="website">Thursday: </label>
          <input
            type="text"
            className="form-control"
            id="thursday"
            value={form.thursday}
            onChange={(e) => updateForm({ thursday: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Friday: </label>
          <input
            type="text"
            className="form-control"
            id="Monday"
            value={form.friday}
            onChange={(e) => updateForm({ friday: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Saturday: </label>
          <input
            type="text"
            className="form-control"
            id="saturday"
            value={form.saturday}
            onChange={(e) => updateForm({ saturday: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Sunday: </label>
          <input
            type="text"
            className="form-control"
            id="sunday"
            value={form.sunday}
            onChange={(e) => updateForm({ sunday: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Facebook: </label>
          <input
            type="text"
            className="form-control"
            id="facebook"
            value={form.facebook}
            onChange={(e) => updateForm({ facebook: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Instagram: </label>
          <input
            type="text"
            className="form-control"
            id="instagram"
            value={form.instagram}
            onChange={(e) => updateForm({ instagram: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Yelp: </label>
          <input
            type="text"
            className="form-control"
            id="yelp"
            value={form.yelp}
            onChange={(e) => updateForm({ yelp: e.target.value })}
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
