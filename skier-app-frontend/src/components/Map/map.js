import React, { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
} from "react-leaflet";
import Control from "react-leaflet-custom-control";
import "leaflet/dist/leaflet.css";
import "./map.css";
import { iconFlag, iconToilet } from "./icon";

const Map = () => {
  const mapRef = useRef(null);
  const limeOptions = { color: "lime" };
  const [markers, setMarkers] = useState([
    { id: 1, name: "A", loc: [71.509, -41] },
    { id: 2, name: "B", loc: [71.6, -43] },
    { id: 3, name: "C", loc: [71.7, -42] },
    { id: 4, name: "D", loc: [71.9, -41] },
    { id: 5, name: "E", loc: [71.505, -40] },
  ]);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [path, setPath] = useState(null);
  const [locateUser, setLocateUser] = useState(false);

  const findPath = () => {
    if (start !== null && end !== null) {
      let path = [
        [start[0].loc[0], start[0].loc[1]],
        [end[0].loc[0], end[0].loc[1]],
      ];
      setPath(path);
    }
  };

  const selectMarker = (id) => {
    if (start == null) setStart(markers.filter((m) => m.id === id));
    else if (end == null) setEnd(markers.filter((m) => m.id === id));
    else {
      console.log(id);
      setEnd(null);
      setPath(null);
      setStart(markers.filter((m) => m.id === id));
    }
  };

  const findUserLocation = () => {
    setLocateUser(true);
  };
  return (
    <div className="h-screen">
      <MapContainer
        ref={mapRef}
        center={[71.6, -43]}
        zoom={13}
        zoomControl={true}
        whenCreated={(mapInstance) => {
          mapRef.current = mapInstance;
          // setMap(mapInstance);
          // mapInstance.locate({ setView: true, maxZoom: 16 });
          // this.setState({ map: mapInstance });
          // setTimeout(function () {
          //   mapInstance.invalidateSize();
          // }, 0);
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}">OpenStreetMap</a> contributors'
          url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
          subdomains={["mt1", "mt2", "mt3"]}
        />
        {markers.map((marker) => {
          return (
            <Marker
              key={marker.id}
              eventHandlers={{
                click: (e) => selectMarker(marker.id),
              }}
              icon={iconFlag}
              position={marker.loc}
            >
              <Popup>{marker.name}</Popup>
            </Marker>
          );
        })}
        <Marker icon={iconToilet} position={[71.507, -40.1]} />
        {path !== null && (
          <Polyline pathOptions={limeOptions} positions={[path]} />
        )}
        {/* <LocationMarker locateUser={locateUser} /> */}
        <Control position="top-right">
          {/* <div> */}
          <button
            className="text-black bg-sky-900 p-4 w-full text-md"
            onClick={findPath}
          >
            Show Path
          </button>
          {/* </div> */}
          {/* <div>
            <button
              className="text-black bg-sky-900 p-1 mt-2 w-full"
              onClick={findUserLocation}
            >
              Locate Me
            </button>
          </div> */}
        </Control>
      </MapContainer>
    </div>
  );
};

export default Map;
