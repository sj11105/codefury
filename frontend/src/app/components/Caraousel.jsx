'use client'
import React, { useState, useEffect } from 'react';
import './Caraousel.css'; // Assuming you have a separate CSS file

const ArtCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const artworks = [
    { id: 1, title: 'Artwork1', imageUrl: 'https://cdn.pixabay.com/photo/2016/09/12/21/57/earthquake-1665871_1280.jpg' },
    { id: 2, title: 'Artwork 2', imageUrl: 'https://cdn.pixabay.com/photo/2015/08/05/14/52/high-water-876580_1280.jpg' },
    { id: 3, title: 'Artwork 3', imageUrl: 'https://cdn.pixabay.com/photo/2012/10/26/02/38/tropical-cyclone-63124_1280.jpg' },
    { id: 4, title: 'Artwork 4', imageUrl: 'https://cdn.pixabay.com/photo/2016/12/17/14/33/wave-1913559_1280.jpg'}
  ];

  useEffect(() => {
    // Set initial currentIndex to 0 to display the first image
    let initialIndex = 0;
    setCurrentIndex(initialIndex);

    // Automatically change slide every 3 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === artworks.length - 1 ? 0 : prevIndex + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [artworks.length]);

  return (
    <div className='carousel'>
      <div className='slide-container' style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {artworks.map((art) => (
          <div key={art.id} className='slide'>
            <img src={art.imageUrl} alt={art.title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtCarousel;