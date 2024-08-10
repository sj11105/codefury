'use client';
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxScript from './MapboxScript';

mapboxgl.accessToken = 'pk.eyJ1IjoiaHNhbmpheSIsImEiOiJjbHY0M2k3MDIwNHR3Mm1xdGVsamt4aHEwIn0.M6rBMLxXLBHHoSpHLN8AEA';

const Mapbox = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return; // Initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [77.5946, 12.9716], // Center on Bangalore
      zoom: 12
    });

    const layerList = document.getElementById('menu');
    const inputs = layerList.getElementsByTagName('input');

    for (const input of inputs) {
      input.onclick = (layer) => {
        const layerId = layer.target.id;
        map.current.setStyle('mapbox://styles/mapbox/' + layerId);
      };
    }

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  return (
    <div>
      <MapboxScript />
      <h1 className="text-xl font-bold mb-4">My Mapbox Map</h1>
      <div ref={mapContainer} className="w-full h-96 bg-gray-300" />
      <div id="menu" className="flex mt-4 space-x-2">
        <div>
          <input id="satellite-v9" type="radio" name="style" value="satellite" />
          <label htmlFor="satellite-v9">Satellite</label>
        </div>
        <div>
          <input id="light-v10" type="radio" name="style" value="light"/>
          <label htmlFor="light-v10">Light</label>
        </div>
        <div>
          <input id="dark-v10" type="radio" name="style" value="dark"/>
          <label htmlFor="dark-v10">Dark</label>
        </div>
        <div>
          <input id="streets-v11" type="radio" name="style" value="streets" defaultChecked />
          <label htmlFor="streets-v11">Streets</label>
        </div>
        <div>
          <input id="outdoors-v11" type="radio" name="style" value="outdoors" />
          <label htmlFor="outdoors-v11">Outdoors</label>
        </div>
      </div>
    </div>
  );
};

export default Mapbox;
