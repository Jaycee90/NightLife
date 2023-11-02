import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import '../css/StarRatings.css';
import { FaStar } from "react-icons/fa";

const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"
    
};

export default function StarRating(props) {
    const [currentValue, setCurrentValue] = useState(0);
    const [hoverValue, setHoverValue] = useState(undefined);
    const stars = Array(5).fill(0)
  
    // is called when the user clicks on a star and updates the currentValue with the chosen rating value.
    const handleClick = value => {
      setCurrentValue(value)
    }
  
    //is called when the user hovers their mouse over a star and updates the hoverValue with the value of the star being hovered over.
    const handleMouseOver = newHoverValue => {
      setHoverValue(newHoverValue)
    };
  
    //is called when the user moves their mouse away from the stars and resets hoverValue to undefined.
    const handleMouseLeave = () => {
      setHoverValue(undefined)
    }

    function calculateNewRating(userRating, currentRating, currentNumber) {
      const newRating = (userRating + currentRating * currentNumber) / (currentNumber + 1);
      return newRating.toFixed(1); 
    }
    
    const params = useParams();

    const [form, setForm] = useState({
      _id: "",
      id: "",
      name: "",
      about: "",
      phone: "",
      website: "",
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
      amenities: "",
      tags: "",
      price: "",
      rating: "",
      review: "",
    });
  
  // accesses the MongoDB database.
    useEffect(() => {
      async function fetchData() {
        const id = params.id.toString();
        const response = await fetch(`http://localhost:5050/record/${params.id}`);
  
        if (!response.ok) {
          const message = `An error has occurred: ${response.statusText}`;
          window.alert(message);
          return;
        }
  
        const venue = await response.json();
        if (!venue) {
          window.alert(`Reviews for venue with id ${id} not found`);
          return;
        }
  
        setForm(venue);
      }
  
      fetchData();
    }, [params.id]);

    async function onSubmit(e) { // Extract form fields for the request body
      e.preventDefault();
      const editedVenue = {
        _id : form._id,
        id : form.id,
        name: form.name,
        address: form.address,
        about: form.about,
        phone: form.phone,
        website: form.website,
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
        amenities: form.amenities,
        tags: form.tags,
        price: form.price,
        rating: calculateNewRating(currentValue, form.rating, form.review),
        review: parseFloat(form.review) + 1,
      };
      
      // Send a PATCH request to update the venue
      await fetch(`http://localhost:5050/record/${params.id}`, {
        method: "PATCH",
        body: JSON.stringify(editedVenue),
        headers: {
          'Content-Type': 'application/json'
        },
      });
    }
    return (
      <div style={styles.container}>
        <div>
          <div style={styles.stars}>{stars.map((_, index) => (
            <FaStar
                key={index}
                size={24}
                onClick={() => handleClick(index + 1)}
                onMouseOver={() => handleMouseOver(index + 1)}
                onMouseLeave={handleMouseLeave}
                color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
                style={{
                    marginRight: 10,
                    cursor: "pointer"
                }}
            />
        ))}
        </div>
        <br/>
        {/*<p style={{color:'#000'}}>Current Index: {currentValue}</p>*/}
        
    </div>

          <br/>
          <form onSubmit={onSubmit} style={{ color: '#000000' }}>
            {/* 
          <div className="form-group">
              <label htmlFor="rating">Rating:</label>
              <input
                type="text"
                className="form-control"
                id="rating"
                value={form.rating}
              />
            </div>
            <div className="form-group">
                <label htmlFor="review">Rating #:</label>
                <input
                  type="text"
                  className="form-control"
                  id="review"
                  value={form.review}
                />
            </div>
              */}
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
};

const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "left",
    },
    stars: {
      display: "flex",
      flexDirection: "row",
      alignItems: "left",
    },
    textarea: {
      border: "1px solid #a9a9a9",
      borderRadius: 5,
      padding: 10,
      margin: "20px 0",
      minHeight: 100,
      width: 300
    },
    button: {
      border: "1px solid #a9a9a9",
      borderRadius: 5,
      width: 300,
      padding: 10,
    }
  
  }