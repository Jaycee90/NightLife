// import React from 'react';
// //import SimpleGMaps from 'simplegmaps-js';

// function TripFinder() {
//     return (
//         <div></div>
//     );
// };

// export default TripFinder;


import React, { useEffect} from 'react';
import SimpleGMaps from 'simplegmaps-js';

function TripFinder() {
    useEffect(() => {
    // Initialize SimpleGMaps
    const myMap = new SimpleGMaps({
        apiKey: 'AIzaSyCB2hfKfLKS-xnrMXBH7f8wvPyvCv1rtBw',
    });

    console.log('SimpleGMaps initialized!');

    myMap.init({
      container: '#MapContainer',
      GeoLocation: true,
      ZoomToFitBounds: true,
    });

    myMap.onInit = function () {
      // console.log('SimpleGMaps initialized!');

      // Add a marker to the map
      myMap.addMarker({
        lat: 29.890661,
        lng: -97.911530,
        title: 'San Marcos',
      });
    };

    // Cleanup SimpleGMaps when the component unmounts
    return () => {
        myMap.destroy();
    };
    }, []);

    return (
        <div>
            <h1>Trip Finder</h1>
            <div id="MapContainer" style={{ height: '400px', width: '100%' }}></div>

        </div>
  );
}

export default TripFinder;
