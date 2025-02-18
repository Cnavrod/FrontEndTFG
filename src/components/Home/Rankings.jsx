//// filepath: /d:/Cosas instituto/1 Grado Superior DAW/SegundoAño/EC/T2/Sprint2.2/Sprint2.2/src/components/Home/Rankings.jsx
import React, { useState, useEffect, useContext } from 'react';
import { mockItems } from '../../services/content_API';
import '../../styles/ranking.css';
import { AuthContext } from '../../components/Home/AuthContext';

export default function Rankings() {
  const [period, setPeriod] = useState('day');
  const [rankedItems, setRankedItems] = useState([]);
  const [userRatings, setUserRatings] = useState({});
  const { currentUser } = useContext(AuthContext);

  // Cargar ratings del usuario actual (o "guest" si no hay usuario logueado).
  useEffect(() => {
    const storageKey = "userRatings_" + (currentUser ? currentUser.username : "guest");
    const storedRatings = localStorage.getItem(storageKey);
    if (storedRatings) {
      setUserRatings(JSON.parse(storedRatings));
    } else {
      setUserRatings({});
    }
  }, [currentUser]);

  // Manejar el cambio de rating para un item específico.
  const handleRatingChange = (itemId, newRating) => {
    const storageKey = "userRatings_" + (currentUser ? currentUser.username : "guest");
    const updatedRatings = { ...userRatings, [itemId]: newRating };
    setUserRatings(updatedRatings);
    localStorage.setItem(storageKey, JSON.stringify(updatedRatings));
  };

  useEffect(() => {
    const now = new Date();
    // Filtrar los items por el período seleccionado.
    const filteredItems = mockItems.filter(item => {
      const itemDate = new Date(item.date);
      const diffTime = Math.abs(now - itemDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (period === 'day') return diffDays <= 1;
      if (period === 'week') return diffDays <= 7;
      if (period === 'month') return diffDays <= 30;
      return true;
    });

    // Ordenar usando la valoración del usuario (default a 0 si aún no puntúa).
    const sortedItems = filteredItems.sort(
      (a, b) => (userRatings[b.id] || 0) - (userRatings[a.id] || 0)
    );
    setRankedItems(sortedItems);
  }, [period, userRatings]);

  return (
    <div className="rankings-container">
      <header>
        <h2>Rankings por Puntuación</h2>
        {currentUser && (
          <p>Bienvenido, {currentUser.username}</p>
        )}
      </header>
      <div className="filters">
        <button
          onClick={() => setPeriod('day')}
          className={period === 'day' ? 'active' : ''}
        >
          Día
        </button>
        <button
          onClick={() => setPeriod('week')}
          className={period === 'week' ? 'active' : ''}
        >
          Semana
        </button>
        <button
          onClick={() => setPeriod('month')}
          className={period === 'month' ? 'active' : ''}
        >
          Mes
        </button>
      </div>
      <div className="rankings-list">
        {rankedItems.length > 0 ? (
          rankedItems.map(item => (
            <div key={item.id} className="ranking-item">
              <img src={item.cover} alt={item.title} />
              <h3>{item.title}</h3>
              <p>Artista: {item.artist}</p>
              <p>Reproducciones: {item.plays}</p>
              <div className="rating-input">
                <label>
                  Mi Valoración:
                  <input
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    value={userRatings[item.id] || ''}
                    onChange={(e) =>
                      handleRatingChange(item.id, Number(e.target.value))
                    }
                    placeholder="0-10"
                  />
                </label>
              </div>
            </div>
          ))
        ) : (
          <p>No hay datos disponibles para el período seleccionado.</p>
        )}
      </div>
    </div>
  );
}