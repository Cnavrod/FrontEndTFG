import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../../services/apiService';
import '../../styles/layout.css';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setInfo('');
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Formato de email inválido');
      return;
    }
    try {
      await forgotPassword(email);
      setInfo('Se ha enviado el enlace de recuperación a tu correo');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError('Correo no registrado o error al enviar el correo');
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Recuperar Contraseña</h2>
      {error && <p className="error">{error}</p>}
      {info && <p className="success">{info}</p>}
      <label>Correo Electrónico</label>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <button type="submit">Enviar Enlace de Recuperación</button>
      <p>
        <a href="/login">Volver al Inicio de Sesión</a>
      </p>
    </form>
  );
}