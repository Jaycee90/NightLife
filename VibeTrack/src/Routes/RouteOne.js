import React from 'react';
import { useParams } from 'react-router-dom';

import './Listing.css';
function RouteOne() {
    const { id } = useParams();
    console.log(id);
    return (
        <div >
            <p> your expected id : {id}</p>
        </div>
    );
}

export default RouteOne;
