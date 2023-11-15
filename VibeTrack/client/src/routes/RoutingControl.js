import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
//import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "../leaflet/leaflet-routing-machine.css";

const createRoutineMachineLayer = ({ position, start, end, color }) => {
  const startIcon = new L.Icon({
    //iconUrl: "https://i.imgur.com/yyb78tO.png", 
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    iconSize: [25, 41],
  });

  const endIcon = new L.Icon({
    iconUrl: 'https://i.imgur.com/wOs7nJb.png',
    iconSize: [25, 41],
  });

  const instance = L.Routing.control({
    position,
    waypoints: [
      start,
      end
    ],
    lineOptions: {
      styles: [
        {
          color,
        },
      ],
    },

    createMarker: (i, waypoint, nWps) => {
      // Create a custom marker here
      const marker = L.marker(waypoint.latLng, {
        icon: i === 0 ? startIcon : endIcon,
        draggable: true
      });

      // // Add a popup to the marker
      // const popupContent = i === 0
      // ? `Your location<br><span class="math-inline">${start.address}</span>`
      // : `Your destination<br><span class="math-inline">${end.address}</span>`;

      // marker.bindPopup(popupContent);


      return marker;
    },
    
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;