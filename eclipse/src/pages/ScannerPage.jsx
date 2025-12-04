import React, { useState, useRef } from 'react';
import './ScannerPage.css';
import Navbar from '../components/Navbar';

const ScannerPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState(null);
  const fileInputRef = useRef(null);

  // Datos de ejemplo para la simulación
  const mockResults = {
    diagnosis: 'Lesión benigna',
    confidence: 92.5,
    riskLevel: 'BAJO',
    description: 'La imagen muestra características típicas de un nevus melanocítico benigno. Se recomienda seguimiento rutinario.',
    recommendations: [
      'Monitorear cambios en tamaño, forma o color',
      'Protección solar diaria',
      'Revisión anual con dermatólogo'
    ],
    timestamp: new Date().toLocaleString()
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
      setScanResults(null);
    }
  };

  const handleScanClick = () => {
    if (!selectedImage) {
      alert('Por favor, selecciona una imagen primero');
      return;
    }

    setIsScanning(true);
    
    // Simular el escaneo con IA (3 segundos)
    setTimeout(() => {
      setIsScanning(false);
      setScanResults(mockResults);
      
      // Aquí es donde luego se integrará con el backend
      console.log('Imagen para escanear:', selectedImage);
      // Llamada al backend: axios.post('/api/scan', formData)
      
    }, 3000);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
      setScanResults(null);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="scanner-page">
      <Navbar />
      
      <div className="scanner-container">
        <div className="scanner-header">
          <h1>Escáner de Piel</h1>
          <p className="subtitle">
            Sube una foto de tu piel para un análisis preliminar con IA
          </p>
        </div>

        <div className="scanner-content">
          {/* Panel izquierdo: Subida de imagen */}
          <div className="upload-panel">
            <div 
              className={`image-upload-area ${previewUrl ? 'has-image' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={previewUrl ? null : triggerFileInput}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                style={{ display: 'none' }}
              />
              
              {previewUrl ? (
                <div className="image-preview">
                  <img src={previewUrl} alt="Vista previa" />
                  <button 
                    className="btn-change-image"
                    onClick={triggerFileInput}
                  >
                    Cambiar imagen
                  </button>
                </div>
              ) : (
                <>
                  <div className="upload-icon">
                    <span className="icon">📷</span>
                  </div>
                  <p className="upload-text">
                    Arrastra y suelta una imagen aquí<br />
                    o haz clic para seleccionar
                  </p>
                  <p className="upload-hint">
                    Formatos: JPG, PNG, JPEG • Máx. 5MB
                  </p>
                </>
              )}
            </div>

            <div className="scan-controls">
              <button 
                className={`btn-scan ${!selectedImage || isScanning ? 'disabled' : ''}`}
                onClick={handleScanClick}
                disabled={!selectedImage || isScanning}
              >
                {isScanning ? (
                  <>
                    <span className="spinner"></span>
                    Escaneando...
                  </>
                ) : '🔬 ESCANEAR IMAGEN'}
              </button>
              
              <div className="scan-tips">
                <h4>Consejos para mejores resultados:</h4>
                <ul>
                  <li>Buena iluminación natural</li>
                  <li>Enfoque nítido en la lesión</li>
                  <li>Incluye una regla o moneda para escala</li>
                  <li>Evita sombras y reflejos</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Panel derecho: Resultados */}
          <div className="results-panel">
            <div className="results-header">
              <h2>Resultados del Análisis</h2>
              <div className="results-status">
                {isScanning ? (
                  <span className="status scanning">Analizando...</span>
                ) : scanResults ? (
                  <span className="status complete">Completado</span>
                ) : (
                  <span className="status pending">Esperando imagen</span>
                )}
              </div>
            </div>

            <div className="results-content">
              {isScanning ? (
                <div className="scanning-animation">
                  <div className="pulse"></div>
                  <p>El modelo de IA está analizando tu imagen...</p>
                </div>
              ) : scanResults ? (
                <>
                  <div className={`diagnosis-card ${scanResults.riskLevel.toLowerCase()}`}>
                    <div className="diagnosis-header">
                      <h3>Diagnóstico preliminar</h3>
                      <span className={`risk-badge ${scanResults.riskLevel.toLowerCase()}`}>
                        {scanResults.riskLevel}
                      </span>
                    </div>
                    
                    <div className="diagnosis-main">
                      <h2 className="diagnosis-text">{scanResults.diagnosis}</h2>
                      <div className="confidence-level">
                        <div className="confidence-bar">
                          <div 
                            className="confidence-fill"
                            style={{ width: `${scanResults.confidence}%` }}
                          ></div>
                        </div>
                        <span className="confidence-value">
                          {scanResults.confidence}% de confianza
                        </span>
                      </div>
                    </div>

                    <div className="diagnosis-details">
                      <p>{scanResults.description}</p>
                      
                      <div className="recommendations">
                        <h4>Recomendaciones:</h4>
                        <ul>
                          {scanResults.recommendations.map((rec, index) => (
                            <li key={index}>{rec}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="results-meta">
                        <span className="timestamp">
                          📅 Analizado: {scanResults.timestamp}
                        </span>
                        <span className="disclaimer">
                          ⚠️ Este es un análisis preliminar. Consulta a un dermatólogo.
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="action-buttons">
                    <button className="btn-secondary">
                      📋 Guardar resultados
                    </button>
                    <button className="btn-secondary">
                      🩺 Encontrar especialistas
                    </button>
                    <button className="btn-secondary" onClick={() => setSelectedImage(null)}>
                      🗑️ Nueva imagen
                    </button>
                  </div>
                </>
              ) : (
                <div className="empty-results">
                  <div className="empty-icon">📄</div>
                  <h3>Sin resultados</h3>
                  <p>Sube una imagen y haz clic en "Escanear" para obtener un análisis</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScannerPage;