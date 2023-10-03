// src/components/RouteOne.js

import React from 'react';

function RouteOne(props) {
  const { name } = useParams();

  return (
    <div>
      <h1 style={{'color':'747474'}}>Hello, {name}</h1>
    </div>
  );
}

export default RouteOne;
