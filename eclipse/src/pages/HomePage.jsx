import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './ScannerPage.css'; // Reutilizamos estilos

const HomePage = () => {
  return (
    <div className="scanner-page">
      <Navbar />
      <div className="scanner-container">
        <div className="scanner-header">
          <h1>Bienvenido a Eclipse</h1>
          <p className="subtitle">Detección temprana de cáncer de piel con inteligencia artificial</p>
        </div>
        <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'white', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
          <h2>Página principal en desarrollo</h2>
          <p style={{ margin: '2rem 0' }}>Ve a la página del escáner para comenzar el análisis</p>
          <Link to="/scanner">
            <button className="btn-scan" style={{ maxWidth: '300px', margin: '0 auto' }}>
              🚀 Ir al Escáner
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;