import React, { useEffect, useState } from 'react';
import { getUserPlaylists } from '../../services/apiService';
import '../../styles/dashboard.css';

export default function MyPlaylists() {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlaylists() {
      try {
        const userPlaylists = await getUserPlaylists();
        setPlaylists(userPlaylists);
      } catch (err) {
        setError('Error al cargar las playlists.');
      } finally {
        setLoading(false);
      }
    }
    fetchPlaylists();
  }, []);

  const handlePlaylistClick = (playlist) => {
    setSelectedPlaylist(playlist);
  };

  if (loading) {
    return <p>Cargando playlists...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="dashboard-container">
      <h2>Mis Playlists</h2>
      {selectedPlaylist ? (
        <div>
          <button onClick={() => setSelectedPlaylist(null)}>Volver</button>
          <h3>{selectedPlaylist.name}</h3>
          <ul>
            {selectedPlaylist.songs.length > 0 ? (
              selectedPlaylist.songs.map((song) => (
                <li key={song._id}>
                  <p><strong>{song.title}</strong> - {song.artist}</p>
                </li>
              ))
            ) : (
              <p>No hay canciones en esta playlist.</p>
            )}
          </ul>
        </div>
      ) : (
        <ul>
          {playlists.map((playlist) => (
            <li key={playlist._id} onClick={() => handlePlaylistClick(playlist)}>
              <p>
                <strong>{playlist.name}</strong> ({playlist.isPublic ? 'Pública' : 'Privada'})
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}