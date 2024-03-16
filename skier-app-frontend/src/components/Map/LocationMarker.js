import { Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import { useState } from "react";
import { iconBlue } from "./icon";

const LocationMarker = ({ locateUser }) => {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click() {
      if (locateUser) map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker icon={iconBlue} position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
};

export default LocationMarker;

// function LocationMarker() {}
