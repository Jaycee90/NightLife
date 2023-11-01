import { useState } from "react";
import { useParams } from "react-router-dom";
import '../css/StarRating.css';
import { FaStar } from "react-icons/fa";

const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"
    
};

// How the 
function StarRating() {
    const [currentValue, setCurrentValue] = useState(0);
    const [hoverValue, setHoverValue] = useState(undefined);
    const [ratingText, setRatingText] = useState(""); // New state for rating text input
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
    const params = useParams();
    const [reviewsData, setReviewsData] = useState({
      ratings: [],
      reviews: [],
    });
  
  // accesses the MongoDB database.
    useEffect(() => {
      async function fetchReviews() {
        const response = await fetch(`http://localhost:5050/reviews/${params.id}`);
  
        if (!response.ok) {
          const message = `An error has occurred: ${response.statusText}`;
          window.alert(message);
          return;
        }
  
        const reviews = await response.json();
        if (!reviews) {
          window.alert(`Reviews for venue with id ${params.id} not found`);
          return;
        }
  
        setReviewsData(reviews);
      }
  
      fetchReviews();
    }, [params.id]);

// this function should allow the user to input the ratings
    const submitRating = async () => {
      // Create a data object with the rating and text
      const ratingData = {
        rating: currentValue,
        text: ratingText,
      };
  
      const response = await fetch(`http://localhost:5050/submit-rating/${params.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ratingData),
      });
  
      if (response.ok) {
        // If the submission was successful, fetch and update the ratings and reviews
        fetchReviews();
        // Clear the input fields
        setCurrentValue(0);
        setRatingText("");
      } else {
        window.alert("Failed to submit rating.");
      }
    };
  
    return (
      <div style={styles.container}>
          <h2> VibeTrack Ratings </h2>
          //generates a set of star icons that users can interact with
          <div style={styles.stars}>
              {stars.map((_, index) => (
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
          <textarea
              placeholder="Write your review here"
              value={ratingText}
              onChange={(e) => setRatingText(e.target.value)}
              style={styles.textarea}
          />
          <button
              style={styles.button}
              onClick={submitRating}
          >
              Submit Rating
          </button>

          <h2>Ratings and Reviews</h2>
          <div>
              <h3>Ratings:</h3>
              <ul>
                  {reviewsData.ratings.map((rating, index) => (
                      <li key={index}>{rating} stars</li>
                  ))}
              </ul>
              <h3>Reviews:</h3>
              <ul>
                  {reviewsData.reviews.map((review, index) => (
                      <li key={index}>{review}</li>
                  ))}
              </ul>
          </div>
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
  
  };

  export default    StarRating;