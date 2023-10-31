import { useState } from "react";
import { useParams } from "react-router-dom";
import '../css/StarRating.css';
import { FaStar } from "react-icons/fa";

const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"
    
};


function StarRating() {
    const [currentValue, setCurrentValue] = useState(0);
    const [hoverValue, setHoverValue] = useState(undefined);
    const stars = Array(5).fill(0)
  
    const handleClick = value => {
      setCurrentValue(value)
    }
  
    const handleMouseOver = newHoverValue => {
      setHoverValue(newHoverValue)
    };
  
    const handleMouseLeave = () => {
      setHoverValue(undefined)
    }
    const [reviewsData, setReviewsData] = useState({
      ratings: 0,
      reviews: 0,
    });
  
    const params = useParams();
  
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
  
    return (
        <div style={styles.container}>
      <h2> VibeTrack Ratings </h2>
      <div style={styles.stars}>
        {stars.map((_, index) => {
          return (
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
          )
        })}
      </div>
      <textarea
        placeholder="This is the ratings page"
        style={styles.textarea}
      />

      <button
        style={styles.button}
      >
        Submit
      </button>
      
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