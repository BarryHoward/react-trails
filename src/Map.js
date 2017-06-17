import React from 'react';
import './index.css';

//Google Maps imports
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const ReactMap = withGoogleMap(props => (
  <GoogleMap
   // ref={props.onMapLoad}
    defaultZoom={3}
    defaultCenter={{ lat: -25.363882, lng: 131.044922 }}
    onClick={props.onMapClick}
  >
    {props.markers.map(marker => (
      <Marker
        {...marker}
        onRightClick={() => props.onMarkerRightClick(marker)}
        onClick={() => props.onMarkerClick(marker)}
      />
    ))}
  </GoogleMap>
));

export {ReactMap}