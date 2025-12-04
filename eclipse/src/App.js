import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import React from 'react';
import './App.css';
import Resultados from './Pages/resultados';

function App() {
  return (
    <div>
    <Navbar/>
    <Routes>
        <Route path="/" />
        <Route path="/pagina_dos" element={< Resultados/>} />
        <Route path="/pagina_tres"/>
    </Routes>
    </div>
  );
}

export default App;
