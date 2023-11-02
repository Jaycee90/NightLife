import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
      return (userRating + currentRating) / (currentNumber + 1);
    }
    const params = useParams();
    const navigate = useNavigate(); // Navigate function from react-router-dom

    const [form, setForm] = useState({
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
          navigate("/");
          return;
        }
  
        setForm(venue);
      }
  
      fetchData();
    }, [params.id, navigate]);

    async function onSubmit(e) { // Extract form fields for the request body
      e.preventDefault();
      const editedVenue = {
        _id : form._id,
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
  
      navigate("/recordList");
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
        <p style={{color:'#000'}}>Current Index: {currentValue}</p>
    </div>

          <br/>
          <form onSubmit={onSubmit} style={{ color: '#000000' }}>
          <div className="form-group">
              <input
                type="submit"
                value="Update Venue"
                className="btn btn-primary"
              />
            </div>
          </form>
          
        <p style={{color:'#000'}}>Current Rating: {form.rating}</p>
        <p style={{color:'#000'}}>Current Review: {form.review}</p>
      </div>
  );
};

const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    stars: {
      display: "flex",
      flexDirection: "row",
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