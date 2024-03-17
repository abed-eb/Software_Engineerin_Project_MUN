import L from "leaflet";
import flag from "../../Assets/flag.png";
import marker from "../../Assets/location.png";
import tiolet from "../../Assets/toilet.png";
import end from "../../Assets/end.png";
import start from "../../Assets/start.png";
import restaurant from "../../Assets/restaurant.png";
import "./marker.css";
var iconBlue = new L.Icon({
  shadowUrl: null,
  iconAnchor: new L.Point(10, 10),
  iconSize: new L.Point(30, 30),
  iconUrl: marker,
  //iconSize: new L.Point(100, 57),
  // className: 'leaflet-div-icon'
});

export { iconBlue };

var iconFlag = new L.Icon({
  shadowUrl: null,
  iconAnchor: new L.Point(10, 10),
  iconSize: new L.Point(40, 40),
  iconUrl: flag,
  //iconSize: new L.Point(100, 57),
  // className: 'leaflet-div-icon'
});

export { iconFlag };

var iconToilet = new L.Icon({
  shadowUrl: null,
  iconAnchor: new L.Point(10, 10),
  iconSize: new L.Point(30, 30),
  iconUrl: tiolet,
  //iconSize: new L.Point(100, 57),
  // className: 'leaflet-div-icon'
});

export { iconToilet };

var iconStart = new L.Icon({
  shadowUrl: null,
  iconAnchor: new L.Point(10, 10),
  iconSize: new L.Point(70, 70),
  iconUrl: start,
  //iconSize: new L.Point(100, 57),
  // className: 'leaflet-div-icon'
});

export { iconStart };

var iconEnd = new L.Icon({
  shadowUrl: null,
  iconAnchor: new L.Point(10, 10),
  iconSize: new L.Point(70, 70),
  iconUrl: end,
  //iconSize: new L.Point(100, 57),
  // className: 'leaflet-div-icon'
});

export { iconEnd };

var iconRestaurant = new L.Icon({
  shadowUrl: null,
  iconAnchor: new L.Point(10, 10),
  iconSize: new L.Point(30, 30),
  iconUrl: restaurant,
  //iconSize: new L.Point(100, 57),
  // className: 'leaflet-div-icon'
});

export { iconRestaurant };
