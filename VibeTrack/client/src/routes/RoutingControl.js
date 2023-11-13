import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
//import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "../leaflet/leaflet-routing-machine.css";

const createRoutineMachineLayer = ({ position, start, end, color }) => {
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
        icon: new L.Icon({
          iconUrl: 'https://i.imgur.com/wOs7nJb.png',
          iconSize: [25, 41],
        }),
        draggable: true
      });
      return marker;
    },
    
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;