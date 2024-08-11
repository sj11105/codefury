'use client'
import React, { useEffect } from 'react';

const MapboxScript = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://api.mapbox.com/mapbox-gl-js/v2.3.1/mapbox-gl.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
};

export default MapboxScript;
