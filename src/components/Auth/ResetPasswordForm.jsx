import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '../../services/apiService';
import '../../styles/layout.css';

export default function ResetPasswordForm() {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setInfo('');
    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      return;
    }
    if (password !== confirm) {
      setError('Las contraseñas no coinciden');
      return;
    }
    try {
      await resetPassword(token, password);
      setInfo('Contraseña restablecida correctamente');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError('Token inválido o expirado');
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Restablecer Contraseña</h2>
      {error && <p className="error">{error}</p>}
      {info && <p className="success">{info}</p>}
      <label>Nueva Contraseña</label>
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <label>Confirmar Contraseña</label>
      <input
        type="password"
        value={confirm}
        onChange={e => setConfirm(e.target.value)}
      />
      <button type="submit">Restablecer</button>
    </form>
  );
}