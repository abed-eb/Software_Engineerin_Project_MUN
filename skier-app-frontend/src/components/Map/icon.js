import L from "leaflet";
import icon from "../../Assets/flag.png";
import icon2 from "../../Assets/location.png";
import "./marker.css";
var iconBlue = new L.Icon({
  shadowUrl: null,
  iconAnchor: new L.Point(10, 10),
  iconSize: new L.Point(30, 30),
  iconUrl: icon,
  //iconSize: new L.Point(100, 57),
  // className: 'leaflet-div-icon'
});

export { iconBlue };

var iconFlag = new L.Icon({
  shadowUrl: null,
  iconAnchor: new L.Point(10, 10),
  iconSize: new L.Point(50, 50),
  iconUrl: icon2,
  //iconSize: new L.Point(100, 57),
  // className: 'leaflet-div-icon'
});

export { iconFlag };
