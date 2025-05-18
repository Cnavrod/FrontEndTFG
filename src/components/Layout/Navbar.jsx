// ...existing imports...
import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../Home/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { currentUser, logout } = useContext(AuthContext);
  const [showMusicMenu, setShowMusicMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav>
      <div className="navbar-top">
        <NavLink to="/" className="logo">
          <h2>Mi Sitio de Música</h2>
        </NavLink>
        {currentUser ? (
          <div className="user-info">
            <span>Bienvenido, {currentUser.username}</span>
            <button className="logout-btn" onClick={handleLogout}>
              Log Out
            </button>
          </div>
        ) : null}
      </div>
      <ul>
        <li>
          <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>
            Dashboard
          </NavLink>
        </li>
        {/* Mostrar solo para cantantes */}
        {currentUser?.role === "cantante" && (
          <li>
            <NavLink to="/crear-cancion" className={({ isActive }) => (isActive ? "active" : "")}>
              Crear Canción
            </NavLink>
          </li>
        )}
        <li>
          <NavLink to="/my-playlists" className={({ isActive }) => (isActive ? "active" : "")}>
            Mis Playlists
          </NavLink>
        </li>
        <li>
          <NavLink to="/public-playlists">Playlists Públicas</NavLink>
        </li>
        <li>
          <NavLink to="/newsletter" className={({ isActive }) => (isActive ? "active" : "")}>
            Newsletter
          </NavLink>
        </li>
        <li>
          <NavLink to="/recommended" className={({ isActive }) => (isActive ? "active" : "")}>
            Recomendaciones
          </NavLink>
        </li>
        <li>
          <NavLink to="/rankings" className={({ isActive }) => (isActive ? "active" : "")}>
            Rankings
          </NavLink>
        </li>
        {!currentUser && (
          <>
            <li>
              <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/register" className={({ isActive }) => (isActive ? "active" : "")}>
                Register
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}