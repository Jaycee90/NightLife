import { useState, useCallback, useEffect, useId } from 'react';
import '../css/test.css';

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

        const records = await response.json();
        setVenueData(records);
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

  return (
    <div className="test-component" style={{ padding: '100px' }}>
      <div className='tags-container'>
        <h1 className='tag-filter'>Tags filtered</h1>
        <div>
          {/* Display selected tags */}
          {tags.length > 0
            ? tags.map((tag) => (
                <button
                  key={`close-button-${id}-${tag}`}
                  className='close'
                  onClick={deleteTag(tag)}
                  style={{ width: '120px', marginBottom: '10px' }}
                >
                  {tag} &nbsp; x
                </button>
              ))
            : 'No tags selected'}
        </div>
      </div>

      {/* Display unique tags as buttons */}
      <div className='unique-tags'>
        {uniqueTags.map((tag) => (
          <button
            key={`unique-tag-${id}-${tag}`}
            type='button'
            onClick={addTag(tag)}
            style={{ width: '90px' }}
          >
            #{tag}
          </button>
        ))}
      </div>

      {/* Display venues without tags */}
      {venueData
        .filter((venue) => matchTags(venue.tags, tags))
        .map(({ name, description }) => (
          <div key={`card-${id}`} className='card'>
            <div>
              {/* Display venue information */}
              <p>{name}</p>
              <p>{description}</p>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Test;
