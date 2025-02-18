import React, { useState } from 'react';
import { songs } from '../../services/content_API';
import '../../styles/home.css';

export default function SongsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % songs.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + songs.length) % songs.length);
  };

  return (
    <div className="carousel-container">
      <h2>Contenido Destacado</h2>
      <button className="carousel-btn prev-btn" onClick={prevSlide}>‹</button>
      <div className="carousel-slide">
        <img
          src={songs[currentIndex].image}
          alt={songs[currentIndex].title}
          className="carousel-image"
        />
        <h3 className="carousel-text">{songs[currentIndex].title}</h3>
        <p className="carousel-text">{songs[currentIndex].artist}</p>
      </div>
      <button className="carousel-btn next-btn" onClick={nextSlide}>›</button>
    </div>
  );
}