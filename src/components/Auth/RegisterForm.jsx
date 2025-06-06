import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/layout.css';
import CustomButton from '../Home/custombutton';
import { registerUser } from "../../services/apiService";

export default function RegisterForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [role, setRole] = useState('oyente'); // Valor predeterminado
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPass) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const data = { username, email, password, role };
      await registerUser(data);
      setSuccess('¡Registro exitoso!');
      setTimeout(() => navigate('/login'), 1000);
    } catch (error) {
      setError('Error al registrar el usuario');
    }
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
        maxLength={12}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label>Correo Electrónico</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>Contraseña</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <label>Confirmar Contraseña</label>
      <input
        type="password"
        value={confirmPass}
        onChange={(e) => setConfirmPass(e.target.value)}
      />
      <label>Rol</label>
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="oyente">Oyente</option>
        <option value="cantante">Cantante</option>
      </select>
      <CustomButton text="Registrarse" styleClass="default-btn btn-spacing" />
      <p>
        <a href="/login">¿Ya tienes una cuenta? Inicia Sesión</a>
      </p>
    </form>
  );
}