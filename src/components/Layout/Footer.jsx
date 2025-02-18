import React from 'react';
import '../../styles/layout.css'; // Importa el archivo CSS

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Sección Sobre Nosotros */}
        <div className="footer-section about">
          <h3>Sobre Nosotros</h3>
          <p>
            Somos una plataforma dedicada a ofrecer la mejor música de tus artistas favoritos.
            Disfruta de playlists personalizadas y descubre nuevos talentos.
          </p>
        </div>
        
        {/* Sección Enlaces Útiles */}
        <div className="footer-section links">
          <h3>Enlaces Útiles</h3>
          <ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="/buscar">Buscar</a></li>
            <li><a href="/biblioteca">Mi Biblioteca</a></li>
            <li><a href="/acerca">Acerca de</a></li>
            <li><a href="/contacto">Contacto</a></li>
          </ul>
        </div>
        
        {/* Sección Redes Sociales */}
        <div className="footer-section social">
          <h3>Síguenos</h3>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">YouTube</a>
          </div>
        </div>
        
      </div>
      
      {/* Pie de Página */}
      <div className="footer-bottom">
        <p>© 2023 Mi Proyecto de Música. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}