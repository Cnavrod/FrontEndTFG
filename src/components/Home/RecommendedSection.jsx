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
    const playlistSongs = selectedPlaylist.songs;
    // Nuevo cálculo de recomendaciones:
    const recs = allSongs
      .filter(song => !playlistSongs.some(ps => ps._id === song._id))
      .map(song => {
        // Busca coincidencias exactas
        const matchingSongs = playlistSongs.filter(ps =>
          (ps.artist === song.artist || ps.genre === song.genre)
        );
        if (matchingSongs.length === 0) return null;
        // Motivo detallado
        const reasons = [];
        matchingSongs.forEach(ms => {
          if (ms.artist === song.artist && ms.genre === song.genre) {
            reasons.push(`"${ms.title}" (mismo artista y género)`);
          } else if (ms.artist === song.artist) {
            reasons.push(`"${ms.title}" (mismo artista)`);
          } else if (ms.genre === song.genre) {
            reasons.push(`"${ms.title}" (mismo género)`);
          }
        });
        return { ...song, reasons };
      })
      .filter(Boolean);

    setRecommendations(recs);
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
        <div className="recommended-list">
          {recommendations.length === 0 && selectedPlaylist && (
            <p>No hay recomendaciones para esta playlist.</p>
          )}
          {recommendations.map((item) => (
            <div key={item._id} className="recommended-row">
              <div>
                <strong>{item.title}</strong> — {item.artist} <span style={{ color: "#7ec7f7" }}>[{item.genre}]</span>
              </div>
              <div className="recommendation-reason">
                <span>Recomendado por: </span>
                <ul>
                  {item.reasons.map((r, idx) => (
                    <li key={idx}>{r}</li>
                  ))}
                </ul>
              </div>
              {item.listen && (
                <button className="default-btn" onClick={() => window.open(item.listen, "_blank")}>
                  Reproducir
                </button>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}