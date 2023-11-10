import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Test() {
  const [searchQuery, setSearchQuery] = useState(''); // Define a state variable for the search query
  const [results, setResults] = useState([]);

  const params = useParams();

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:5050/record/search/${searchQuery}`);
      if (!response.ok) {
        throw new Error(`An error has occurred: ${response.statusText}. ${searchQuery}`);
      }
      const data = await response.json();
      setResults(data);
    } 
    catch (error) {
      console.error(error);
      window.alert(error.message);
    }
  };

  useEffect(() => {
    if (params.id) {
      async function fetchData() {
        try {
          const response = await fetch(`http://localhost:5050/record/${params.id}`);
          if (!response.ok) {
            throw new Error(`An error has occurred: ${response.statusText}`);
          }
          const data = await response.json();
          setResults(data);
        } catch (error) {
          console.error(error);
          window.alert(error.message);
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
