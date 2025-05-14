import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import {
  getUserPlaylists,
  createPlaylist,
  addSongToPlaylist,
  deletePlaylist,
  fetchSongs
} from '../../services/apiService';
import '../../styles/dashboard.css';

export default function MyPlaylists() {
  const { token } = useContext(AuthContext);
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [songs, setSongs] = useState([]);
  const [showAddSong, setShowAddSong] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Cargar playlists y canciones
  useEffect(() => {
    async function fetchData() {
      try {
        const [userPlaylists, allSongs] = await Promise.all([
          getUserPlaylists(token),
          fetchSongs(token)
        ]);
        setPlaylists(userPlaylists);
        setSongs(allSongs);
      } catch (err) {
        setError('Error al cargar las playlists o canciones.');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [token]);

  // Crear playlist
  const handleCreatePlaylist = async (e) => {
    e.preventDefault();
    try {
      const playlist = await createPlaylist({ name: newPlaylistName, isPublic }, token);
      setPlaylists((prev) => [...prev, playlist]);
      setNewPlaylistName('');
      setIsPublic(false);
    } catch {
      setError('Error al crear la playlist');
    }
  };

    const filteredSongs = selectedPlaylist && selectedPlaylist.songs
    ? selectedPlaylist.songs.filter(song =>
        song &&
        (song.title.toLowerCase().includes(search.toLowerCase()) ||
         song.artist.toLowerCase().includes(search.toLowerCase()) ||
         song.genre.toLowerCase().includes(search.toLowerCase()))
      )
    : [];

  // Eliminar playlist
  const handleDeletePlaylist = async (playlistId) => {
    if (!window.confirm('¿Seguro que quieres eliminar esta playlist?')) return;
    try {
      await deletePlaylist(playlistId, token);
      setPlaylists((prev) => prev.filter((pl) => pl._id !== playlistId));
      setSelectedPlaylist(null);
    } catch {
      setError('Error al eliminar la playlist');
    }
  };

  // Añadir canción a playlist
  const handleAddSong = async (songId) => {
    try {
      const updated = await addSongToPlaylist(selectedPlaylist._id, songId, token);
      // Buscar la canción añadida en el array de canciones global
      const addedSong = songs.find(s => s._id === songId);
      // Actualizar el array de canciones de la playlist seleccionada
      const updatedSongs = [...(selectedPlaylist.songs || []), addedSong];
      const updatedPlaylist = { ...selectedPlaylist, songs: updatedSongs };
      setSelectedPlaylist(updatedPlaylist);
      setPlaylists((prev) =>
        prev.map((pl) =>
          pl._id === updated._id
            ? { ...pl, songs: updatedSongs }
            : pl
        )
      );
      setShowAddSong(false);
    } catch {
      setError('Error al añadir la canción');
    }
  };

  if (loading) return <p>Cargando playlists...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="spotify-playlists-container">
      {/* Sidebar de playlists */}
      <aside className="playlist-sidebar">
        <h3>Tus Playlists</h3>
        <ul>
          {playlists.map((playlist) => (
            <li
              key={playlist._id}
              className={selectedPlaylist && selectedPlaylist._id === playlist._id ? 'active' : ''}
              onClick={() => setSelectedPlaylist(playlist)}
            >
              <span>{playlist.name}</span>
              <button
                className="delete-btn"
                onClick={e => { e.stopPropagation(); handleDeletePlaylist(playlist._id); }}
                title="Eliminar playlist"
              >🗑️</button>
            </li>
          ))}
        </ul>
        <form className="create-playlist-form" onSubmit={handleCreatePlaylist}>
          <input
            type="text"
            placeholder="Nueva playlist"
            value={newPlaylistName}
            onChange={e => setNewPlaylistName(e.target.value)}
            required
          />
          <label>
            <input
              type="checkbox"
              checked={isPublic}
              onChange={e => setIsPublic(e.target.checked)}
            />
            Pública
          </label>
          <button type="submit">Crear</button>
        </form>
      </aside>

      {/* Detalle de playlist */}
      <main className="playlist-detail">
        {selectedPlaylist ? (
          <>
            <h2>{selectedPlaylist.name} <span className="playlist-type">{selectedPlaylist.isPublic ? 'Pública' : 'Privada'}</span></h2>
            <button className="add-song-btn" onClick={() => setShowAddSong(true)}>+ Añadir Canción</button>
            <ul className="playlist-songs">
              {selectedPlaylist.songs && selectedPlaylist.songs.length > 0 ? (
                selectedPlaylist.songs.map((song) =>
                  song && song.title ? (
                    <li key={song._id}>
                      <strong>{song.title}</strong> - {song.artist}
                    </li>
                  ) : null
                )
              ) : (
                <li>No hay canciones en esta playlist.</li>
              )}
            </ul>
            {/* Modal para añadir canción */}
            {showAddSong && (
              <div className="modal">
                <div className="modal-content">
                  <h3>Selecciona una canción</h3>
                  <ul>
                    {songs
                      .filter(song =>
                        !selectedPlaylist.songs.some(s => s && s._id === song._id)
                      )
                      .map(song => (
                        <li key={song._id}>
                          <button onClick={() => handleAddSong(song._id)}>
                            {song.title} - {song.artist}
                          </button>
                        </li>
                      ))}
                  </ul>
                  <button onClick={() => setShowAddSong(false)}>Cerrar</button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="playlist-placeholder">
            <h2>Selecciona una playlist para ver sus canciones</h2>
          </div>
        )}
      </main>
    </div>
  );
}