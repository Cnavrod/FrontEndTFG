import React, { useEffect, useState } from "react";
import { mockItems } from "../../services/content_API";
import "../../styles/recommendation.css";

export default function RecommendedSection() {
  const [recommendations, setRecommendations] = useState([]);
  const [relatedItems, setRelatedItems] = useState([]);
  const [reasonMap, setReasonMap] = useState({});

  useEffect(() => {
    setRecommendations(mockItems);
  }, []);

  function handlePlay(clickedItem) {
    // 1) Mantener la lógica de canciones relacionadas
    const filtered = mockItems
      .filter((item) => {
        if (item.id === clickedItem.id) return false;
        return (
          item.artist === clickedItem.artist ||
          item.genre === clickedItem.genre
        );
      })
      .map((item) => {
        let reason = "";
        if (item.artist === clickedItem.artist && item.genre === clickedItem.genre) {
          reason = "Mismo artista y género";
        } else if (item.artist === clickedItem.artist) {
          reason = "Mismo artista";
        } else if (item.genre === clickedItem.genre) {
          reason = "Mismo género";
        }
        return { ...item, reason };
      });

    setRelatedItems(filtered);
    const newReasonMap = {};
    filtered.forEach((item) => {
      newReasonMap[item.id] = item.reason;
    });
    setReasonMap(newReasonMap);

    // 2) Abrir enlace de YouTube
    window.open(clickedItem.listen, '_blank');
  }

  return (
    <>
      {relatedItems.length > 0 && (
        <section className="related-section">
          <h2>Canciones Relacionadas</h2>
          <div className="recommended-grid">
            {relatedItems.map((item) => (
              <article key={item.id} className="recommended-card">
                <img src={item.cover} alt={item.title} className="recommended-image" />
                <h3>{item.title}</h3>
                <p><strong>Artista:</strong> {item.artist}</p>
                <p><strong>Género:</strong> {item.genre}</p>
                <p>
                  <strong>Porque te podría gustar:</strong> {reasonMap[item.id] || ""}
                </p>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="recommended-section">
        <h2>Te Podría Gustar</h2>
        <div className="recommended-grid">
          {recommendations.map((item) => (
            <article key={item.id} className="recommended-card">
              <img
                src={item.cover}
                alt={item.title}
                className="recommended-image"
              />
              <h3>{item.title}</h3>
              <p><strong>Artista:</strong> {item.artist}</p>
              <p><strong>Género:</strong> {item.genre}</p>
              <button className="default-btn" onClick={() => handlePlay(item)}>
                Reproducir
              </button>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}