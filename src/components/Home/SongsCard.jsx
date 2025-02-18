import React from 'react';

export default function SongsCard({ item }) {
  return (
    <article>
      <img src={item?.cover} alt={item?.title} />
      <h3>{item?.title}</h3>
      <p>Género: {item?.genre}</p>
      <p>Duración: {item?.duration}</p>
      {/* Abrimos item.listen en otra pestaña */}
      <button onClick={() => window.open(item?.listen, '_blank')}>
        Reproducir
      </button>
      <button>Ver más</button>
    </article>
  );
}