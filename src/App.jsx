import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/Home/AuthContext';
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
        {/* 3. Modificar la ruta de RecommendedSection para pasar las props necesarias */}
        <Route
          path="/recommended"
          element={
            <RecommendedSection
              recentlyViewed={recentlyViewed}
              onItemPlay={handleItemPlay}
            />
          }
        />
        {/* 4. Pasar la función handleItemPlay al Dashboard */}
        <Route
          path="/dashboard"
          element={<Dashboard onItemPlay={handleItemPlay} />}
        />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        <Route path="/rankings" element={<Rankings />} />
      </Routes>
      <Footer />
      </AuthProvider>
    </>
  );
}