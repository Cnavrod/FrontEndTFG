import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  const login = (user, token) => {
    setCurrentUser(user);
    setToken(token);
  };

  const logout = () => {
    setCurrentUser(null);
    setToken(null);
    navigate('/login'); // Redirige al usuario a la página de inicio de sesión
  };

  useEffect(() => {
    // Opcional: Puedes implementar lógica para verificar el token en el backend al cargar la aplicación
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}