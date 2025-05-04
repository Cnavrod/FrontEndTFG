import React, { useEffect, useState } from 'react';
import { fetchSongs } from '../../services/apiService';
import '../../styles/dashboard.css';

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadSongs() {
      try {
        const songs = await fetchSongs();
        setItems(songs);
      } catch (err) {
        setError('Error al cargar las canciones.');
      } finally {
        setLoading(false);
      }
    }
    loadSongs();
  }, []);

  if (loading) {
    return <p>Cargando canciones...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      {items.length > 0 ? (
        <table className="songs-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Artista</th>
              <th>Duración</th>
              <th>Género</th>
              <th>Año</th>
            </tr>
          </thead>
          <tbody>
            {items.map((song) => (
              <tr key={song.id} className="song-row">
                <td>{song.title}</td>
                <td>{song.artist}</td>
                <td>{song.duration} minutos</td>
                <td>{song.genre}</td>
                <td>{song.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay canciones disponibles.</p>
      )}
    </div>
  );
}