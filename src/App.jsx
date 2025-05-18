import React, { useState, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './components/Home/AuthContext';
import Navbar from './components/Layout/Navbar';
import HeroSection from './components/Home/HeroSection';
import SongsCarousel from './components/Home/SongsCarousel';
import ContentList from './components/Home/ContentList';
import RecommendationList from './components/Home/RecommendationsList';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import ForgotPasswordForm from './components/Auth/ForgotPasswordForm';
import Footer from './components/Layout/Footer';
import Dashboard from './components/Home/Dashboard';
import RecommendedSection from './components/Home/RecommendedSection';
import Rankings from './components/Home/Rankings';
import MyPlaylists from './components/Home/MyPlaylists';
import PublicPlaylists from './components/Home/PublicPlaylists';
import NewsletterSubscribe from './components/Home/NewsletterSubscribe';
import ResetPasswordForm from './components/Auth/ResetPasswordForm';
import CreateSong from './components/Songs/CreateSong';

// Componente para proteger rutas privadas
function PrivateRoute({ children }) {
  const { currentUser } = useContext(AuthContext);
  return currentUser ? children : <Navigate to="/login" />;
}

export default function App() {
  // 1. Definir el estado para los ítems reproducidos recientemente
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  // 2. Función para agregar un ítem a recentlyViewed
  function handleItemPlay(item) {
    setRecentlyViewed((prev) => {
      // Evitar duplicados
      if (prev.some((prevItem) => prevItem.id === item.id)) {
        return prev;
      }
      return [...prev, item];
    });
  }

  return (
    <>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <SongsCarousel />
                <ContentList />
                <RecommendationList />
              </>
            }
          />
          <Route
            path="/recommended"
            element={
              <RecommendedSection
                recentlyViewed={recentlyViewed}
                onItemPlay={handleItemPlay}
              />
            }
          />
          <Route
            path="/dashboard"
            element={<Dashboard onItemPlay={handleItemPlay} />}
          />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/forgot-password" element={<ForgotPasswordForm />} />
          <Route path="/rankings" element={<Rankings />} />
          <Route path="/public-playlists" element={<PublicPlaylists />} />
          <Route path="/newsletter" element={<NewsletterSubscribe />} />
          <Route path="/crear-cancion" element={<CreateSong />} />
          <Route
            path="/my-playlists"
            element={
              <PrivateRoute>
                <MyPlaylists />
              </PrivateRoute>
            }
          />
          <Route path="/reset-password/:token" element={<ResetPasswordForm />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </>
  );
}