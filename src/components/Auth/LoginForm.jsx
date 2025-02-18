//// filepath: /d:/Cosas instituto/1 Grado Superior DAW/SegundoAño/EC/T2/Sprint2.2/Sprint2.2/src/components/Auth/LoginForm.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../components/Home/AuthContext';
import { mockUser } from '../../services/auth_API';
import '../../styles/layout.css';
import CustomButton from '../Home/custombutton';

export default function LoginForm() {
  const { login } = useContext(AuthContext);
  const [userInput, setUserInput] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const matchedUser = mockUser.find(
      user =>
        (user.username === userInput || user.email === userInput) &&
        user.password === password
    );
    if (matchedUser) {
      setSuccess('Has iniciado sesión correctamente.');
      login(matchedUser);
      setTimeout(() => navigate('/'), 1000);
    } else {
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
        onChange={(e) => {
          setError('');
          setSuccess('');
          setUserInput(e.target.value);
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
      <div className="remember-container">
        <label>
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          Recordarme
        </label>
      </div>
      <CustomButton text="Iniciar Sesión" styleClass="default-btn" />
      <p>
        <a href="/forgot-password">¿Olvidaste tu contraseña?</a>
      </p>
    </form>
  );
}