import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Test() {
  const [searchQuery, setSearchQuery] = useState(''); // Define a state variable for the search query
  const [results, setResults] = useState([]);

  const params = useParams();

  const handleSearch = async () => {
    try {
      // Send a request to the backend API for a search query
      const response = await fetch(`http://localhost:5050/record/search/${searchQuery}`);
      
      // Check if the response is successful (status code 2xx)
      if (!response.ok) {
        // If there's an error, throw a custom Error with a descriptive message
        throw new Error(`An error has occurred: ${response.statusText}. ${searchQuery}`);
      }
  
      // Parse the response as JSON and update the 'results' state
      const data = await response.json();
      setResults(data);
    } catch (error) {
      // If an error occurs during the fetch or parsing, handle it here
      console.error(error);
      window.alert(error.message); // Display an alert with the error message
    }
  };
  
  useEffect(() => {
    if (params.id) {
      async function fetchData() {
        try {
          // Send a request to the backend API for a specific record by ID
          const response = await fetch(`http://localhost:5050/record/${params.id}`);
          
          // Check if the response is successful (status code 2xx)
          if (!response.ok) {
            // If there's an error, throw a custom Error with a descriptive message
            throw new Error(`An error has occurred: ${response.statusText}`);
          }
  
          // Parse the response as JSON and updateW the 'results' state
          const data = await response.json();
          setResults(data);
        } catch (error) {
          // If an error occurs during the fetch or parsing, handle it here
          console.error(error);
          window.alert(error.message); // Display an alert with the error message
        }
      }
      fetchData();
    }
  }, [params.id]);
  
  return (
    <div style={{ padding: '20px' }}>
      <input
        type="text"
        placeholder="Search for venues... "
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          backgroundColor: "#fff",
          color: '#747474',
          paddingBottom: '10px',
          marginTop: '0px',
          borderRadius: '10px'
        }}
      />
      <button onClick={handleSearch}>Search</button>

      {/* Render the results */}
      {results.map(result => (
        <div key={result._id}>{result.name}</div>
      ))}
    </div>
  );
}

export default Test;
