import L from "leaflet";
import flag from "../../Assets/flag.png";
import marker from "../../Assets/location.png";
import tiolet from "../../Assets/toilet.png";
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
  iconSize: new L.Point(50, 50),
  iconUrl: flag,
  //iconSize: new L.Point(100, 57),
  // className: 'leaflet-div-icon'
});

export { iconFlag };

var iconToilet = new L.Icon({
  shadowUrl: null,
  iconAnchor: new L.Point(10, 10),
  iconSize: new L.Point(50, 50),
  iconUrl: tiolet,
  //iconSize: new L.Point(100, 57),
  // className: 'leaflet-div-icon'
});

export { iconToilet };
