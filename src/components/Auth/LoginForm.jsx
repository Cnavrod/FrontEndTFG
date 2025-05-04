import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../components/Home/AuthContext';
import '../../styles/layout.css';
import CustomButton from '../Home/custombutton';
import { loginUser } from "../../services/apiService";

export default function LoginForm() {
  const { login } = useContext(AuthContext);
  const [userInput, setUserInput] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const data = { username: userInput, password };
      const response = await loginUser(data);
      localStorage.setItem('token', response.token);
      login(response.user);
      setSuccess('Has iniciado sesión correctamente.');
      setTimeout(() => navigate('/'), 1000);
    } catch (error) {
      setError('Credenciales inválidas');
    }
  };

  return (
    <form className="auth-form centered-form" onSubmit={handleSubmit}>
      <h2>Iniciar Sesión</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <label>Usuario</label>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <label>Contraseña</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <CustomButton text="Iniciar Sesión" styleClass="default-btn" />
      <p>
        <a href="/forgot-password">¿Olvidaste tu contraseña?</a>
      </p>
    </form>
  );
}