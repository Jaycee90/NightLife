import React from 'react';
//import SimpleGMaps from 'simplegmaps-js';

function TripFinder() {
    return (
        <div></div>
    );
};

export default TripFinder;




// import React, { useEffect, useRef } from 'react';
// import SimpleGMaps from 'simplegmaps-js';

// function TripFinder() {
//   const scriptRef = useRef();

//   useEffect(() => {
//     // Include the Google Maps API script with the apiKey
//     if (!scriptRef.current) {
//       const script = document.createElement('script');
//       script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCrXwSbZ68OHK7NEVT68PeBQCA5tQe6Ulw&libraries=places`;
//       script.type = 'text/javascript';
//       script.async = true;
//       script.defer = true;
//       document.head.appendChild(script);
//       scriptRef.current = script;
//     }

//     return () => {
//         // Remove the script when the component unmounts
//         if (scriptRef.current) {
//             document.head.removeChild(scriptRef.current);
//         }
//     };
//   }, []);

//   useEffect(() => {
//     // Initialize SimpleGMaps
//     const myMap = new SimpleGMaps({
//         apiKey: 'AIzaSyCrXwSbZ68OHK7NEVT68PeBQCA5tQe6Ulw',
//     });

//     myMap.init({
//       container: '#MapContainer',
//       GeoLocation: true,
//       ZoomToFitBounds: true,
//     });

//     myMap.onInit = function () {
//       console.log('SimpleGMaps initialized!');
//     };

//     // Cleanup SimpleGMaps when the component unmounts
//     return () => {
//       myMap.destroy();
//     };
//   }, []);

//   return (
//     <div>
//       <h1>Trip Finder</h1>
//       <div id="MapContainer" style={{ height: '400px', width: '100%' }}></div>

//     </div>
//   );
// }

// export default TripFinder;
