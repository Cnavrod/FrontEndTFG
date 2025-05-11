import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { fetchSongs, getUserPlaylists, createPlaylist, addSongToPlaylist } from '../../services/apiService';
import '../../styles/dashboard.css';

export default function Dashboard() {
  const { token } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [isPublic, setIsPublic] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [songs, userPlaylists] = await Promise.all([fetchSongs(token), getUserPlaylists(token)]);
        setItems(songs);
        setPlaylists(userPlaylists);
      } catch (err) {
        setError('Error al cargar los datos.');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [token]);

  const handleCreatePlaylist = async (e) => {
    e.preventDefault();
    try {
      const newPlaylist = await createPlaylist({ name: newPlaylistName, isPublic }, token);
      setPlaylists((prev) => [...prev, newPlaylist]);
      setNewPlaylistName('');
      setIsPublic(false);
      alert('Playlist creada exitosamente');
    } catch (error) {
      alert('Error al crear la playlist');
    }
  };

  const handleAddToPlaylist = async (songId) => {
    try {
      await addSongToPlaylist(selectedPlaylist, songId, token);
      alert('Canción añadida a la playlist');
    } catch (error) {
      alert('Error al añadir la canción a la playlist');
    }
  };

  if (loading) {
    return <p>Cargando canciones...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <form className="create-playlist-form" onSubmit={handleCreatePlaylist}>
        <h3>Crear Nueva Playlist</h3>
        <input
          type="text"
          placeholder="Nombre de la playlist"
          value={newPlaylistName}
          onChange={(e) => setNewPlaylistName(e.target.value)}
          required
        />
        <label>
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
          />
          Hacer pública
        </label>
        <button type="submit">Crear Playlist</button>
      </form>
      <select value={selectedPlaylist} onChange={(e) => setSelectedPlaylist(e.target.value)}>
        <option value="">Selecciona una playlist</option>
        {playlists.map((playlist) => (
          <option key={playlist._id} value={playlist._id}>
            {playlist.name} ({playlist.isPublic ? 'Pública' : 'Privada'})
          </option>
        ))}
      </select>
      {items.length > 0 ? (
        <table className="songs-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Artista</th>
              <th>Duración</th>
              <th>Género</th>
              <th>Año</th>
              <th>Acciones</th>
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
                <td>
                  <button onClick={() => handleAddToPlaylist(song.id)}>Añadir a Playlist</button>
                </td>
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