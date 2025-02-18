import React from 'react';
import { mockItems } from '../../services/content_API';
import '../../styles/layout.css';

export default function ContentList() {
  return (
    <section className="cards-container">
      {mockItems.map((item) => (
        <article key={item.id}>
          <img src={item.cover} alt={item.title} />
          <h3>{item.title}</h3>
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
    </section>
  );
}