import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { fetchSongs } from '../../services/apiService';
import '../../styles/dashboard.css';


export default function Dashboard() {
  const { token } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadData() {
      try {
        const songs = await fetchSongs(token);
        setItems(songs);
      } catch (err) {
        setError('Error al cargar los datos.');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [token]);

  const filteredItems = items.filter(song =>
    song.title.toLowerCase().includes(search.toLowerCase()) ||
    song.artist.toLowerCase().includes(search.toLowerCase()) ||
    song.genre.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <p>Cargando canciones...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <input
        type="text"
        placeholder="Buscar por nombre, artista o género..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ marginBottom: '1rem', padding: '0.5rem', width: '100%' }}
      />
      {filteredItems.length > 0 ? (
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
            {filteredItems.map((song) => (
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