import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockUser } from '../../services/auth_API';
import '../../styles/layout.css'; // Importar estilos

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo]   = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setInfo('');
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Formato de email inválido');
      return;
    }
    if (email !== mockUser.email) {
      setError('Correo no registrado');
      return;
    }
    setInfo('Se ha enviado el enlace de recuperación a tu correo');
    // Redirige a la pantalla principal tras un breve lapso
    setTimeout(() => navigate('/login'), 1000);
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
        onChange={(e) => {
          setError('');
          setInfo('');
          setEmail(e.target.value);
        }}
      />
      <button type="submit">Enviar Enlace de Recuperación</button>
      <p>
        <a href="/login">Volver al Inicio de Sesión</a>
      </p>
    </form>
  );
}