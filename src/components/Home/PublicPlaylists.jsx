import React, { useEffect, useState } from 'react';
import { getPublicPlaylists } from '../../services/apiService';
import '../../styles/dashboard.css';

export default function PublicPlaylists() {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const publicPlaylists = await getPublicPlaylists();
        setPlaylists(publicPlaylists);
      } catch {
        setError('Error al cargar las playlists públicas.');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <p>Cargando playlists públicas...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="spotify-playlists-container">
      <aside className="playlist-sidebar">
        <h3>Playlists Públicas</h3>
        <ul>
          {playlists.map((playlist) => (
            <li
              key={playlist._id}
              className={selectedPlaylist && selectedPlaylist._id === playlist._id ? 'active' : ''}
              onClick={() => setSelectedPlaylist(playlist)}
            >
              <span>{playlist.name}</span>
              <span style={{ fontSize: '0.9em', color: '#b4d4ee', marginLeft: 8 }}>
                {playlist.owner?.username ? `por ${playlist.owner.username}` : ''}
              </span>
            </li>
          ))}
        </ul>
      </aside>
      <main className="playlist-detail">
        {selectedPlaylist ? (
          <>
            <h2>
              {selectedPlaylist.name}
              <span className="playlist-type"> Pública</span>
            </h2>
            <p style={{ color: '#b4d4ee' }}>
              Creada por: <strong>{selectedPlaylist.owner?.username || 'Usuario'}</strong>
            </p>
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
          </>
        ) : (
          <div className="playlist-placeholder">
            <h2>Selecciona una playlist pública para ver sus canciones</h2>
          </div>
        )}
      </main>
    </div>
  );
}