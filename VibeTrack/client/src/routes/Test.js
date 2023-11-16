import { useState, useCallback, useEffect, useId } from 'react';
import { Link } from "react-router-dom";
import '../css/discover.css';
import { isMenuItem, isVenueType, isVenueFeature, categorizeTags } from '../components/tag.js';

function Test() {
  // State to manage selected tags
  const [tags, setTags] = useState([]);

  // Generate a unique ID for elements with the useId hook
  const id = useId();

  // State to store venue data
  const [venueData, setVenueData] = useState([]);

  useEffect(() => {
    async function getRecords() {
      try {
        const response = await fetch(`http://localhost:5050/record/`);

        if (!response.ok) {
          throw new Error(`An error occurred: ${response.statusText}`);
        }

        const venueData = await response.json();
        setVenueData(venueData);
      } catch (error) {
        window.alert(error.message);
      }
    }

    getRecords();
  }, []);

  // Function to add a tag to the selected tags state
  const addTag = useCallback(
    (tag) => () => {
      if (!tags.includes(tag)) {
        setTags((prevTags) => [...prevTags, tag]);
      }
    },
    [tags]
  );

  // Function to remove a tag from the selected tags state
  const deleteTag = useCallback(
    (tagId) => () => {
      const tagsFiltered = tags.filter((tag) => tag !== tagId);
      setTags(tagsFiltered);
    },
    [tags]
  );

  // Function to check if a venue matches the selected tags
  const matchTags = (current, target) => {
    return target.every((tag) => current.includes(tag));
  };

  // Extract unique tags from all venues
  const uniqueTags = Array.from(new Set(venueData.flatMap((venue) => venue.tags)));

  const categorizedTags = categorizeTags(uniqueTags);
  return (
    <div  className="discover-component" style={{marginBottom:'40px'}}>
    <h2 className="h2 section-title">Filter by tags</h2>

    {tags.length > 0
            ? tags.map((tag) => (
                <button
                  key={`close-button-${id}-${tag}`}
                  className='close'
                  onClick={deleteTag(tag)}
                  style={{ width: '100px', marginBottom: '12px', fontSize:'10px', backgroundColor: "#e24e99" }}
                >
                  {tag} &nbsp; x
                </button>
              ))
            : 'No tags selected'}

      <div className="grid-discover-search">
        <div className="item">{/* Display selected tags */}
        
        <div class="container-search" style={{paddingRight:"20px"}}>
        {/* Display unique tags as buttons */}
        
         <div className='unique-tags'>
        {categorizedTags.venueType.map((tag) => (
          <button
            key={`unique-tag-${id}-${tag}`}
            type='button'
            onClick={addTag(tag)}
            style={{ width: '110px', fontSize:'12px',  backgroundColor: "#e24e99", borderRadius:'10px'}}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className='unique-tags' style={{marginTop:'20px'}}>
        {categorizedTags.venueFeatures.map((tag) => (
          <button
            key={`unique-tag-${id}-${tag}`}
            type='button'
            onClick={addTag(tag)}
            style={{ width: '110px', fontSize:'12px',  backgroundColor: "#e24e99", borderRadius:'10px'}}
          >
            {tag}
          </button>
        ))}
      </div>
        </div>
        
        </div>
        <div className="item">
        <div class="container" style={{paddingTop:'20px', paddingLeft:'20px',}}>

        <ul className="discover-list" style={{marginRight:'10px'}}>

      {/* Display venues without tags */}
      {venueData
        .filter((venue) => matchTags(venue.tags, tags))
        .map((venueData) => (
          <div  className="discover-card" key={`card-${id}`}>
                  <figure className="card-img">
                    <img src={venueData.image} alt={venueData.name} loading="lazy" />
                  </figure>

                  <div className="card-content">
                    <div className="card-rating">
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                    </div>

                    <p className="card-subtitle">{venueData.address}</p>
                    <h3 className="h3 card-title"><Link to={`/data/${venueData._id}`}>{venueData.name}</Link></h3>
                    
                    <p className="card-text">{venueData.about.length > 80 ? venueData.about.slice(0, 80) + "..." : venueData.about}</p>
                  </div>
          </div>
        ))}
        </ul>
        </div>
    </div>
    </div>
    </div>
  );
}

export default Test;
