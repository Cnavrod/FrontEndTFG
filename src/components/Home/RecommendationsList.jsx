import React from 'react';
import { recommendations } from '../../services/content_API';
import '../../styles/layout.css';

export default function RecommendationsList() {
  const categories = ['Populares', 'Tendencias', 'Nuevos Lanzamientos'];

  return (
    <section className="recommendations-section">
      <h2>Recomendaciones Personalizadas</h2>
      {categories.map((category) => (
        <div key={category} className="recommendation-category">
          <h3>{category}</h3>
          <div className="cards-container">
            {recommendations
              .filter((item) => item.category === category)
              .map((item) => (
                <article key={item.id}>
                  <img src={item.cover} alt={item.title} />
                  <h3>{item.title}</h3>
                  <p>Artista: {item.artist}</p>
                  <p>Género: {item.genre}</p>
                  <p>Duración: {item.duration}</p>
                  <div className="button-group">
                    {/* Abrimos item.listen en otra pestaña */}
                    <button
                      className="play-button"
                      onClick={() => window.open(item.listen, '_blank')}
                    >
                      Reproducir
                    </button>
                    <button className="details-button">Ver más</button>
                  </div>
                </article>
              ))}
          </div>
        </div>
      ))}
    </section>
  );
}