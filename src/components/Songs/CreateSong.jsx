import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../Home/AuthContext';
import { createSong, fetchAllSingers } from '../../services/apiService';

export default function CreateSong({ onSongCreated }) {
  const { currentUser, token } = useContext(AuthContext);
  const [form, setForm] = useState({ title: '', duration: '', genre: '', year: '', collaborator: '' });
  const [singers, setSingers] = useState([]);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (currentUser?.role === 'cantante') {
      fetchAllSingers(token).then(setSingers).catch(() => setSingers([]));
    }
  }, [currentUser, token]);

  if (currentUser?.role !== 'cantante') return null;

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await createSong(form, token);
      setSuccess('Canción creada correctamente');
      setForm({ title: '', duration: '', genre: '', year: '', collaborator: '' });
      if (onSongCreated) onSongCreated();
    } catch {
      setError('Error al crear la canción');
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Crear Canción</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <label>Título</label>
      <input name="title" value={form.title} onChange={handleChange} required />
      <label>Duración</label>
      <input name="duration" value={form.duration} onChange={handleChange} required />
      <label>Género</label>
      <input name="genre" value={form.genre} onChange={handleChange} required />
      <label>Año</label>
      <input name="year" type="number" value={form.year} onChange={handleChange} required />
      <label>Colaborador (opcional)</label>
      <select name="collaborator" value={form.collaborator} onChange={handleChange}>
        <option value="">Ninguno</option>
        {singers.filter(s => s._id !== currentUser.id).map(s => (
          <option key={s._id} value={s._id}>{s.username}</option>
        ))}
      </select>
      <button type="submit">Crear Canción</button>
    </form>
  );
}