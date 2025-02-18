import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockUser } from '../../services/auth_API';
import '../../styles/layout.css';
import CustomButton from '../Home/custombutton';

export default function RegisterForm() {
  const [username, setUsername]       = useState('');
  const [email, setEmail]             = useState('');
  const [password, setPassword]       = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [error, setError]             = useState('');
  const [success, setSuccess]         = useState('');
  const navigate = useNavigate();

  const validatePassword = (pass) =>
    /[A-Z]/.test(pass) && /\d/.test(pass) && /\W/.test(pass) && pass.length >= 8;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Formato de email inválido');
      return;
    }
    if (!validatePassword(password)) {
      setError('La contraseña debe tener 8 caracteres, 1 mayúscula, 1 número y 1 símbolo');
      return;
    }
    if (password !== confirmPass) {
      setError('Las contraseñas no coinciden');
      return;
    }
    if (username === mockUser.username || email === mockUser.email) {
      setError('Ese usuario o correo ya está registrado');
      return;
    }
    setSuccess('¡Registro exitoso!');
    setTimeout(() => navigate('/login'), 1000);
  };

  return (
    <form className="auth-form centered-form" onSubmit={handleSubmit}>
      <h2>Registrarse</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <label>Nombre de Usuario</label>
      <input
        type="text"
        value={username}
        onChange={(e) => {
          setError('');
          setSuccess('');
          setUsername(e.target.value);
        }}
      />
      <label>Correo Electrónico</label>
      <input
        type="text"
        value={email}
        onChange={(e) => {
          setError('');
          setSuccess('');
          setEmail(e.target.value);
        }}
      />
      <label>Contraseña</label>
      <input
        type="password"
        value={password}
        onChange={(e) => {
          setError('');
          setSuccess('');
          setPassword(e.target.value);
        }}
      />
      <label>Confirmar Contraseña</label>
      <input
        type="password"
        value={confirmPass}
        onChange={(e) => {
          setError('');
          setSuccess('');
          setConfirmPass(e.target.value);
        }}
      />
      <CustomButton text="Registrarse" styleClass="default-btn btn-spacing" />
      <p>
        <a href="/login">¿Ya tienes una cuenta? Inicia Sesión</a>
      </p>
    </form>
  );
}