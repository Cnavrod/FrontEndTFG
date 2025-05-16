import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/home.css';
import CustomButton from './custombutton';

export default function HeroSection() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/dashboard');
  };

  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Bienvenido a tu web de musica de confianza</h1>
        <p>Disfruta de tus canciones favoritas</p>
        <CustomButton
          text="Explorar"
          onClick={handleClick}
          styleClass="default-btn"
        />
      </div>
    </section>
  );
}