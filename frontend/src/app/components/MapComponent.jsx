"use client";

import 'mapbox-gl/dist/mapbox-gl.css'; // Import the CSS for Mapbox
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@mui/material';
import RoomIcon from '@mui/icons-material/Room';

const ReactMapGL = dynamic(() => import('react-map-gl'), { ssr: false });
const Marker = dynamic(() => import('react-map-gl').then(mod => mod.Marker), { ssr: false });

const MapComponent = () => {
  const [viewport, setViewport] = useState({
    latitude: 20.5937, // Default latitude for center of India
    longitude: 78.9629, // Default longitude
    zoom: 5 // Default zoom level
  });

  const [userLocation, setUserLocation] = useState(null); // State to hold user location

  useEffect(() => {
    // Request user's geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          setViewport({
            latitude,
            longitude,
            zoom: 12 // Zoom in to the user's location
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          // Handle location error
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      // Handle browser not supporting geolocation
    }
  }, []); // Empty dependency array ensures this runs once on component mount

  // Example marker locations within India
  const markerLocations = [
    { latitude: 28.6139, longitude: 77.2090 }, // Delhi
    { latitude: 19.0760, longitude: 72.8777 }, // Mumbai
    { latitude: 13.0827, longitude: 80.2707 }  // Chennai
  ];

  return (
    <div style={{ height: '200px' }}>
      <ReactMapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onMove={(evt) => setViewport(evt.viewport)} // Updated for react-map-gl 6.x
        onMoveEnd={(evt) => setViewport(evt.viewport)} // Updated for react-map-gl 6.x
        mapboxAccessToken="pk.eyJ1IjoiaHNhbmpheSIsImEiOiJjbHY0M2k3MDIwNHR3Mm1xdGVsamt4aHEwIn0.M6rBMLxXLBHHoSpHLN8AEA"
        minZoom={3} // Set minimum zoom level to view more of the country
        maxZoom={15} // Set maximum zoom level to view detailed areas
        interactive={true} // Ensure map is interactive
      >
        {markerLocations.map((loc, index) => (
          <Marker
            key={index}
            latitude={loc.latitude}
            longitude={loc.longitude}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <RoomIcon style={{ color: 'red', fontSize: '40px' }} />
          </Marker>
        ))}
        {userLocation && (
          <Marker
            latitude={userLocation.latitude}
            longitude={userLocation.longitude}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <RoomIcon style={{ color: 'blue', fontSize: '40px' }} /> {/* Different color for user location */}
          </Marker>
        )}
      </ReactMapGL>
      <Button onClick={() => console.log("Button Clicked")}>Click Me</Button>
    </div>
  );
};

export default MapComponent;
