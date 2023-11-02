import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import '../css/Template.css';

function Favorites() {
  const [venueName, setVenueName] = useState(""); // State for the venue name
  const params = useParams();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`http://localhost:5050/record/${params.id}`);

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const venue = await response.json();
      if (!venue) {
        window.alert(`Venue with id ${params.id} not found`);
        return;
      }

      setVenueName(venue.name);
    }

    fetchData();
  }, [params.id]);

  return (
    <div>
      <h1>{venueName}</h1>
    </div>
  );
}

export default Favorites;
