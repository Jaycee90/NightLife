import React from 'react';
import { useParams } from "react-router-dom";

function RouteOne(props) {

  let { name } = useParams();

  return(
    <div><h1 style={{'color':'#747474'}}>Hello {name ? name : "login"}</h1>;</div>
  );
};

export default RouteOne;
