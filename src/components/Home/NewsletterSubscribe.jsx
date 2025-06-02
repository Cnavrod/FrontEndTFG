import React, { useState } from 'react';
import '../../styles/layout.css';

export default function NewsletterSubscribe() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    try {
      const response = await fetch('https://backendtfg-57v6.onrender.com/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Error al suscribirse');
      }
      setSuccess('¡Te has suscrito correctamente! Revisa tu correo.');
      setEmail('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="newsletter-section">
      <h2>Suscríbete a la Newsletter</h2>
      <form onSubmit={handleSubmit} className="newsletter-form">
        <input
          type="email"
          placeholder="Tu correo electrónico"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <button type="submit">Suscribirse</button>
      </form>
      {success && <p className="success">{success}</p>}
      {error && <p className="error">{error}</p>}
    </section>
  );
}