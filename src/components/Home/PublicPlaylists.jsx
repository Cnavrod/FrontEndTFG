import React, { useEffect, useState, useContext } from 'react';
import { getPublicPlaylists, getPlaylistComments, addCommentToPlaylist } from '../../services/apiService';
import { AuthContext } from './AuthContext';
import '../../styles/dashboard.css';

export default function PublicPlaylists() {
  const { token, currentUser } = useContext(AuthContext);
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
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

  // Cargar comentarios al seleccionar playlist
  useEffect(() => {
    async function fetchComments() {
      if (selectedPlaylist) {
        const comms = await getPlaylistComments(selectedPlaylist._id);
        setComments(comms);
      }
    }
    fetchComments();
  }, [selectedPlaylist]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    try {
      await addCommentToPlaylist(selectedPlaylist._id, commentText, token);
      const comms = await getPlaylistComments(selectedPlaylist._id);
      setComments(comms);
      setCommentText('');
    } catch {
      setError('Error al añadir el comentario');
    }
  };

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
            <section className="playlist-comments">
              <h3>Comentarios</h3>
              <ul>
                {comments.length > 0 ? (
                  comments.map((c, idx) => (
                    <li key={idx}>
                      <strong>{c.username}:</strong> {c.text} <span style={{ color: '#aaa', fontSize: '0.8em' }}>{new Date(c.date).toLocaleString()}</span>
                    </li>
                  ))
                ) : (
                  <li>No hay comentarios.</li>
                )}
              </ul>
              {token && (
                <form onSubmit={handleAddComment} style={{ marginTop: 10 }}>
                  <input
                    type="text"
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                    placeholder="Escribe un comentario..."
                    style={{ width: '70%', marginRight: 8 }}
                  />
                  <button type="submit">Comentar</button>
                </form>
              )}
            </section>
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