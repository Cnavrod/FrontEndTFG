import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Home/AuthContext";
import { fetchSongs, getUserPlaylists } from "../../services/apiService";
import "../../styles/recommendation.css";

export default function RecommendedSection() {
  const { token } = useContext(AuthContext);
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [allSongs, setAllSongs] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [reasonMap, setReasonMap] = useState({});

  // Cargar playlists y canciones del usuario
  useEffect(() => {
    async function loadData() {
      try {
        const userPlaylists = await getUserPlaylists(token);
        setPlaylists(userPlaylists);
        const songs = await fetchSongs(token);
        setAllSongs(songs);
      } catch {
        setPlaylists([]);
        setAllSongs([]);
      }
    }
    if (token) loadData();
  }, [token]);

  // Calcular recomendaciones cuando se selecciona una playlist
  useEffect(() => {
    if (!selectedPlaylist || !selectedPlaylist.songs || allSongs.length === 0) {
      setRecommendations([]);
      setReasonMap({});
      return;
    }
    // Obtener canciones de la playlist seleccionada
    const playlistSongs = selectedPlaylist.songs;
    // Obtener géneros y artistas de la playlist
    const genres = new Set(playlistSongs.map(song => song.genre));
    const artists = new Set(playlistSongs.map(song => song.artist));
    // Buscar recomendaciones en todas las canciones (que no estén ya en la playlist)
    const recs = allSongs
      .filter(song => !playlistSongs.some(ps => ps._id === song._id))
      .map(song => {
        let reason = "";
        if (artists.has(song.artist) && genres.has(song.genre)) {
          reason = "Mismo artista y género";
        } else if (artists.has(song.artist)) {
          reason = "Mismo artista";
        } else if (genres.has(song.genre)) {
          reason = "Mismo género";
        }
        return reason ? { ...song, reason } : null;
      })
      .filter(Boolean);

    setRecommendations(recs);
    const newReasonMap = {};
    recs.forEach(song => {
      newReasonMap[song._id] = song.reason;
    });
    setReasonMap(newReasonMap);
  }, [selectedPlaylist, allSongs]);

  return (
    <div className="recommendations-layout">
      <aside className="playlist-sidebar">
        <h3>Tus Playlists</h3>
        <ul>
          {playlists.map((playlist) => (
            <li
              key={playlist._id}
              className={selectedPlaylist && selectedPlaylist._id === playlist._id ? "active" : ""}
              onClick={() => setSelectedPlaylist(playlist)}
              style={{ cursor: "pointer" }}
            >
              {playlist.name}
            </li>
          ))}
        </ul>
      </aside>
      <main className="recommended-section">
        <h2>
          {selectedPlaylist
            ? `Recomendaciones basadas en "${selectedPlaylist.name}"`
            : "Selecciona una playlist para ver recomendaciones"}
        </h2>
        <div className="recommended-grid">
          {recommendations.length === 0 && selectedPlaylist && (
            <p>No hay recomendaciones para esta playlist.</p>
          )}
          {recommendations.map((item) => (
            <article key={item._id} className="recommended-card">
              <img src={item.cover} alt={item.title} className="recommended-image" />
              <h3>{item.title}</h3>
              <p><strong>Artista:</strong> {item.artist}</p>
              <p><strong>Género:</strong> {item.genre}</p>
              <p>
                <strong>Recomendado por:</strong> {reasonMap[item._id]}
              </p>
              {item.listen && (
                <button className="default-btn" onClick={() => window.open(item.listen, "_blank")}>
                  Reproducir
                </button>
              )}
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}