import React from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import Control from "react-leaflet-custom-control";
import "leaflet/dist/leaflet.css";
import "./map.css";
import { iconFlag } from "./icon";

const Map = () => {
  const selectPoint = (type) => {
    console.log(type);
  };
  return (
    <div className="h-screen">
      <MapContainer center={[51.505, -0.09]} zoom={13} zoomControl={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker icon={iconFlag} position={[51.505, -0.09]}>
          {/* <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup> */}
        </Marker>
        <Control position="top-right">
          <div>
            <button
              className="text-black bg-sky-900 p-1 w-full"
              onClick={() => selectPoint("A")}
            >
              Select Start Point
            </button>
          </div>
          <div>
            <button
              className="text-black bg-sky-900 p-1 mt-2 w-full"
              onClick={() => selectPoint("B")}
            >
              Select End Point
            </button>
          </div>
        </Control>
      </MapContainer>
    </div>
  );
};

export default Map;
