import React, { useEffect, useState } from "react";
import { mockItems } from "../../services/content_API";
import "../../styles/dashboard.css";

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [genres, setGenres] = useState([]);
  const [years, setYears] = useState([]);
  const [types, setTypes] = useState([]);
  const [artists, setArtists] = useState([]);

  // Filtros seleccionados
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [type, setType] = useState("");
  const [artist, setArtist] = useState("");

  // URL del video a reproducir y el id del item que se está reproduciendo
  const [videoUrl, setVideoUrl] = useState("");
  const [playingId, setPlayingId] = useState(null);

  // Cargar datos y extraer valores únicos
  useEffect(() => {
    const updatedItems = mockItems.map(item => ({
      ...item,
      popularity: item.popularity || 0,
      year: item.year || "",
      type: item.type || "",
      artist: item.artist || "Desconocido"
    }));
    setItems(updatedItems);

    const uniqueGenres = [...new Set(updatedItems.map(i => i.genre).filter(Boolean))];
    setGenres(uniqueGenres);

    const uniqueYears = [...new Set(updatedItems.map(i => i.year).filter(Boolean))];
    setYears(uniqueYears);

    const uniqueTypes = [...new Set(updatedItems.map(i => i.type).filter(Boolean))];
    setTypes(uniqueTypes);

    const uniqueArtists = [...new Set(updatedItems.map(i => i.artist).filter(Boolean))];
    setArtists(uniqueArtists);
  }, []);

  // Construye una URL de inserción para iframe a partir de la URL de YouTube
  function getEmbedUrl(url) {
    try {
      // Caso: https://www.youtube.com/watch?v=<VIDEO_ID>
      if (url.includes("youtube.com/watch?v=")) {
        const parts = url.split("v=");
        const videoId = parts[1].split("&")[0]; // Eliminamos posibles parámetros adicionales
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0`;
      }
  
      // Caso: https://youtu.be/<VIDEO_ID>
      if (url.includes("youtu.be/")) {
        const parts = url.split("youtu.be/");
        const videoId = parts[1].split("?")[0];
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`;
      }
    } catch (error) {
      console.error("Error obteniendo videoId:", error);
    }
    return url;
  }

  // Maneja el click en "Reproducir"
  function handlePlay(id) {
    setItems(prev => {
      const updated = prev.map(item => {
        if (item.id === id) {
          const embedSrc = getEmbedUrl(item.listen);
          setVideoUrl(embedSrc);
          setPlayingId(item.id);
          return { ...item, popularity: (item.popularity || 0) + 1 };
        }
        return item;
      });
      return updated.sort((a, b) => b.popularity - a.popularity);
    });
  }

  // Filtra dinámicamente
  const filteredItems = items.filter(item => {
    const matchGenre = genre ? item.genre === genre : true;
    const matchYear = year ? item.year === parseInt(year, 10) : true;
    const matchType = type ? item.type === type : true;
    const matchArtist = artist ? item.artist === artist : true;
    return matchGenre && matchYear && matchType && matchArtist;
  });

  return (
    <div className="dashboard-container">
      <h2>Dashboard Interactivo</h2>
      <div className="filters">
        <select value={genre} onChange={e => setGenre(e.target.value)}>
          <option value="">Género</option>
          {genres.map(g => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
        <select value={year} onChange={e => setYear(e.target.value)}>
          <option value="">Año</option>
          {years.map(y => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
        <select value={type} onChange={e => setType(e.target.value)}>
          <option value="">Tipo</option>
          {types.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <select value={artist} onChange={e => setArtist(e.target.value)}>
          <option value="">Artista</option>
          {artists.map(a => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
      </div>

      {/* Lista de resultados filtrados */}
      <div className="chart">
        {filteredItems.map(item => (
          <div key={item.id} className="item-card">
            {playingId === item.id && videoUrl ? (
              <iframe
                width="280"
                height="157"
                src={videoUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <img src={item.cover} alt={item.title} className="item-image" />
            )}
            <h3>{item.title}</h3>
            <p><strong>Género:</strong> {item.genre}</p>
            <p><strong>Año:</strong> {item.year}</p>
            <p><strong>Tipo:</strong> {item.type}</p>
            <p><strong>Artista:</strong> {item.artist}</p>
            <p><strong>Popularidad:</strong> {item.popularity}</p>
            <button onClick={() => handlePlay(item.id)}>Reproducir</button>
          </div>
        ))}
      </div>
    </div>
  );
}