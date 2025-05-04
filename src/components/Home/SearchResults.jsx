import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchSongs } from "../../services/apiService";
import "../../styles/layout.css";

// Función para quitar acentos y convertir a minúsculas
const normalizeText = (text) =>
  text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export default function SearchResults() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const rawQuery = searchParams.get("query") || "";
  const query = rawQuery.trim();
  const [results, setResults] = useState([]);

  useEffect(() => {
    async function searchSongs() {
      try {
        const songs = await fetchSongs();
        const filtered = songs.filter((item) => {
          const normalizedQuery = query.toLowerCase();
          return (
            item.title.toLowerCase().includes(normalizedQuery) ||
            item.artist.toLowerCase().includes(normalizedQuery)
          );
        });
        setResults(filtered);
      } catch (error) {
        console.error("Error searching songs:", error);
      }
    }
    searchSongs();
  }, [query]);

  const handlePlay = (item) => {
    window.open(item.listen, "_blank");
  };

  return (
    <div className="search-results-container">
      <h2>Resultados de la búsqueda: "{query}"</h2>
      {query === "" ? (
        <p>Por favor, ingrese un término de búsqueda.</p>
      ) : results.length === 0 ? (
        <p>No se encontraron resultados para "{query}".</p>
      ) : (
        <div className="results-grid">
          {results.map((item) => (
            <div key={item.id} className="result-card">
              <img src={item.cover} alt={item.title} className="result-image" />
              <h3>{item.title}</h3>
              <p>
                <strong>Artista:</strong> {item.artist}
              </p>
              <p>
                <strong>Género:</strong> {item.genre}
              </p>
              <button className="default-btn" onClick={() => handlePlay(item)}>
                Reproducir
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}