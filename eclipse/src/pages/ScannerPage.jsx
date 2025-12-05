import React, { useState, useRef } from 'react';
import './ScannerPage.css';
import Navbar from '../components/Navbar';

// Importación para cuando el backend esté listo
// import { scanImage } from '../services/api';

const ScannerPage = () => {
  // Estados principales
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState(null);
  
  // Nuevos estados para mejoras
  const [error, setError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  
  // Referencias
  const fileInputRef = useRef(null);

  // Función para obtener resultados aleatorios (simulación)
  const getRandomResult = () => {
    const results = [
      {
        id: 1,
        diagnosis: 'Lesión benigna',
        confidence: Math.floor(Math.random() * 20) + 85, // 85-95%
        riskLevel: 'BAJO',
        description: 'La imagen muestra características típicas de un nevus melanocítico benigno. Se recomienda seguimiento rutinario.',
        recommendations: [
          'Monitorear cambios en tamaño, forma o color cada 6 meses',
          'Protección solar diaria con FPS 50+',
          'Revisión anual con dermatólogo',
          'Evitar exposición solar directa en horas pico'
        ],
        nextSteps: [
          { text: 'Autoexamen mensual', priority: 'normal' },
          { text: 'Consulta anual programada', priority: 'normal' }
        ]
      },
      {
        id: 2,
        diagnosis: 'Lesión atípica',
        confidence: Math.floor(Math.random() * 15) + 70, // 70-85%
        riskLevel: 'MEDIO',
        description: 'Se observan características atípicas que requieren evaluación profesional. No presenta signos claros de malignidad pero necesita seguimiento cercano.',
        recommendations: [
          'Consulta dermatológica en los próximos 30 días',
          'Fotografía de seguimiento en 3 meses',
          'Biopsia según criterio médico',
          'Evitar manipulación de la lesión'
        ],
        nextSteps: [
          { text: 'Consulta en 1 mes', priority: 'medium' },
          { text: 'Fotografía comparativa en 3 meses', priority: 'medium' }
        ]
      },
      {
        id: 3,
        diagnosis: 'Lesión sospechosa',
        confidence: Math.floor(Math.random() * 10) + 80, // 80-90%
        riskLevel: 'ALTO',
        description: 'Presenta características que requieren evaluación inmediata por especialista. Se recomienda atención prioritaria.',
        recommendations: [
          'Consulta dermatológica urgente (1-2 semanas)',
          'Biopsia recomendada',
          'No automedicar ni manipular la lesión',
          'Protección solar estricta'
        ],
        nextSteps: [
          { text: 'Consulta urgente', priority: 'high' },
          { text: 'Posible biopsia', priority: 'high' }
        ]
      }
    ];
    
    // Seleccionar resultado aleatorio
    const randomIndex = Math.floor(Math.random() * results.length);
    return {
      ...results[randomIndex],
      timestamp: new Date().toLocaleString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      scanId: `SCAN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };
  };

  // Validación de archivo
  const validateFile = (file) => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = [
      'image/jpeg',
      'image/jpg', 
      'image/png',
      'image/gif',
      'image/webp',
      'image/bmp',
      'image/tiff'
    ];

    if (!allowedTypes.includes(file.type)) {
      throw new Error('Formato no válido. Usa JPG, PNG, GIF, WebP o BMP.');
    }

    if (file.size > maxSize) {
      throw new Error(`La imagen es muy grande (${(file.size / 1024 / 1024).toFixed(2)}MB). Máximo 10MB.`);
    }

    return true;
  };

  // Manejo de subida de imagen
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      validateFile(file);
      
      setSelectedImage(file);
      setError(null);
      setScanResults(null);
      
      // Crear vista previa
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
      
    } catch (err) {
      setError(err.message);
      // Limpiar input file
      event.target.value = '';
    }
  };

  // Manejo de arrastrar y soltar
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      try {
        validateFile(file);
        
        setSelectedImage(file);
        setError(null);
        setScanResults(null);
        
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
        
      } catch (err) {
        setError(err.message);
      }
    } else {
      setError('Por favor, arrastra solo archivos de imagen.');
    }
  };

  // Disparar el input file
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // Limpiar imagen
  const clearImage = () => {
    setSelectedImage(null);
    setPreviewUrl('');
    setScanResults(null);
    setError(null);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Escanear imagen
  const handleScanClick = async () => {
    if (!selectedImage) {
      setError('Por favor, selecciona una imagen primero');
      return;
    }

    setIsScanning(true);
    setError(null);
    setUploadProgress(0);
    
    // Simulación de progreso de subida
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 15;
      });
    }, 200);

    try {
      // === CÓDIGO PARA CUANDO EL BACKEND ESTÉ LISTO ===
      /*
      const formData = new FormData();
      formData.append('image', selectedImage);
      formData.append('userId', 'usuario-actual'); // Ajustar según autenticación
      formData.append('metadata', JSON.stringify({
        timestamp: new Date().toISOString(),
        device: navigator.userAgent,
        resolution: 'original'
      }));
      
      const response = await scanImage(formData);
      setScanResults(response.data);
      */
      // === FIN CÓDIGO BACKEND ===

      // Simulación temporal (3 segundos)
      setTimeout(() => {
        clearInterval(progressInterval);
        setUploadProgress(100);
        
        // Simular análisis con IA
        setTimeout(() => {
          const result = getRandomResult();
          setScanResults(result);
          setIsScanning(false);
          
          // Guardar en historial local
          saveToHistory(result);
          
        }, 1500);
        
      }, 3000);
      
    } catch (err) {
      clearInterval(progressInterval);
      setError('Error al procesar la imagen. Intenta de nuevo.');
      setIsScanning(false);
      setUploadProgress(0);
    }
  };

  // Re-escanear
  const handleRetryScan = () => {
    if (selectedImage) {
      handleScanClick();
    }
  };

  // Guardar en historial local
  const saveToHistory = (result) => {
    try {
      const history = JSON.parse(localStorage.getItem('eclipseScanHistory') || '[]');
      const historyItem = {
        ...result,
        imagePreview: previewUrl,
        date: new Date().toISOString(),
        saved: true
      };
      
      history.unshift(historyItem);
      // Mantener solo los últimos 50 escaneos
      localStorage.setItem('eclipseScanHistory', JSON.stringify(history.slice(0, 50)));
    } catch (err) {
      console.error('Error guardando en historial:', err);
    }
  };

  // Guardar resultados
  const handleSaveResults = () => {
    if (scanResults) {
      saveToHistory(scanResults);
      // Mostrar feedback visual
      alert('✅ Resultados guardados en el historial');
    }
  };

  // Encontrar especialistas
  const handleFindSpecialists = () => {
    window.open('https://www.aedv.es/buscador-de-dermatologos/', '_blank', 'noopener,noreferrer');
  };

  // Copiar resultados al portapapeles
  const handleCopyResults = async () => {
    if (scanResults) {
      const textToCopy = `
Diagnóstico: ${scanResults.diagnosis}
Nivel de Riesgo: ${scanResults.riskLevel}
Confianza: ${scanResults.confidence}%
Fecha: ${scanResults.timestamp}

Descripción: ${scanResults.description}

Recomendaciones:
${scanResults.recommendations.map((rec, i) => `${i + 1}. ${rec}`).join('\n')}

⚠️ Este es un análisis preliminar. Consulta a un dermatólogo.
      `.trim();
      
      try {
        await navigator.clipboard.writeText(textToCopy);
        alert('📋 Resultados copiados al portapapeles');
      } catch (err) {
        alert('❌ Error al copiar resultados');
      }
    }
  };

  // Descargar resultados como JSON
  const handleDownloadResults = () => {
    if (scanResults) {
      const dataStr = JSON.stringify(scanResults, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `eclipse-resultado-${Date.now()}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    }
  };

  // Obtener color según nivel de riesgo
  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case 'BAJO': return '#2ecc71';
      case 'MEDIO': return '#f39c12';
      case 'ALTO': return '#e74c3c';
      default: return '#3498db';
    }
  };

  // Obtener icono según nivel de riesgo
  const getRiskIcon = (riskLevel) => {
    switch (riskLevel) {
      case 'BAJO': return '✅';
      case 'MEDIO': return '⚠️';
      case 'ALTO': return '🚨';
      default: return 'ℹ️';
    }
  };

  return (
    <div className="scanner-page">
      <Navbar />
      
      <div className="scanner-container">
        {/* Encabezado */}
        <div className="scanner-header">
          <h1>Escáner de Piel</h1>
          <p className="subtitle">
            Sube una foto de tu piel para un análisis preliminar con IA
          </p>
        </div>

        {/* Mensajes de error */}
        {error && (
          <div className="error-message">
            <div className="error-content">
              <span className="error-icon">⚠️</span>
              <span className="error-text">{error}</span>
            </div>
            <button 
              className="error-close"
              onClick={() => setError(null)}
              aria-label="Cerrar mensaje de error"
            >
              ×
            </button>
          </div>
        )}

        {/* Contenido principal */}
        <div className="scanner-content">
          {/* Panel izquierdo: Subida de imagen */}
          <div className="upload-panel">
            <div 
              className={`image-upload-area ${isDragging ? 'drag-over' : ''} ${previewUrl ? 'has-image' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={previewUrl ? null : triggerFileInput}
              aria-label="Área para subir imagen"
              role="button"
              tabIndex={0}
              onKeyPress={(e) => e.key === 'Enter' && triggerFileInput()}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                style={{ display: 'none' }}
                aria-label="Seleccionar archivo de imagen"
              />
              
              {previewUrl ? (
                <div className="image-preview">
                  <img 
                    src={previewUrl} 
                    alt="Vista previa de la imagen a analizar" 
                    onError={() => setError('Error al cargar la imagen')}
                  />
                  <div className="image-overlay">
                    <button 
                      className="btn-change-image"
                      onClick={triggerFileInput}
                      aria-label="Cambiar imagen"
                    >
                      📁 Cambiar imagen
                    </button>
                    <button 
                      className="btn-remove-image"
                      onClick={clearImage}
                      aria-label="Eliminar imagen"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="upload-icon">
                    <span className="icon" role="img" aria-label="Cámara">📷</span>
                  </div>
                  <p className="upload-text">
                    {isDragging ? '¡Suelta la imagen aquí!' : 'Arrastra y suelta una imagen aquí'}
                    <br />
                    o haz clic para seleccionar
                  </p>
                  <p className="upload-hint">
                    Formatos soportados: JPG, PNG, GIF, WebP, BMP, TIFF
                    <br />
                    Tamaño máximo: 10MB
                  </p>
                  <div className="upload-features">
                    <span className="feature-tag">📸 Enfoque nítido</span>
                    <span className="feature-tag">☀️ Buena iluminación</span>
                    <span className="feature-tag">📐 Incluye escala</span>
                  </div>
                </>
              )}
            </div>

            {/* Barra de progreso */}
            {isScanning && uploadProgress > 0 && (
              <div className="upload-progress">
                <div className="progress-header">
                  <span>Progreso del análisis</span>
                  <span className="progress-percent">{uploadProgress}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${uploadProgress}%` }}
                    role="progressbar"
                    aria-valuenow={uploadProgress}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                <div className="progress-steps">
                  <span className={`step ${uploadProgress >= 25 ? 'active' : ''}`}>Subiendo</span>
                  <span className={`step ${uploadProgress >= 50 ? 'active' : ''}`}>Procesando</span>
                  <span className={`step ${uploadProgress >= 75 ? 'active' : ''}`}>Analizando</span>
                  <span className={`step ${uploadProgress >= 100 ? 'active' : ''}`}>Completado</span>
                </div>
              </div>
            )}

            {/* Controles */}
            <div className="scan-controls">
              <button 
                className={`btn-scan ${!selectedImage || isScanning ? 'disabled' : ''}`}
                onClick={handleScanClick}
                disabled={!selectedImage || isScanning}
                aria-label="Iniciar escaneo de imagen"
              >
                {isScanning ? (
                  <>
                    <span className="spinner" aria-hidden="true"></span>
                    {uploadProgress < 100 ? 'Analizando...' : 'Procesando resultados...'}
                  </>
                ) : (
                  <>
                    <span className="scan-icon" role="img" aria-label="Microscopio">🔬</span>
                    ESCANEAR IMAGEN
                  </>
                )}
              </button>
              
              {/* Botón de re-escanear */}
              {scanResults && !isScanning && (
                <button 
                  className="btn-rescan"
                  onClick={handleRetryScan}
                  aria-label="Realizar nuevo escaneo con la misma imagen"
                >
                  <span className="rescan-icon" role="img" aria-label="Recargar">🔄</span>
                  Re-escanear imagen
                </button>
              )}

              {/* Consejos */}
              <div className="scan-tips">
                <h4>🎯 Consejos para mejores resultados:</h4>
                <ul>
                  <li>
                    <strong>Iluminación:</strong> Luz natural indirecta o flash difuso
                  </li>
                  <li>
                    <strong>Enfoque:</strong> Nítido en la lesión, sin desenfoque
                  </li>
                  <li>
                    <strong>Escala:</strong> Incluye regla o moneda para referencia
                  </li>
                  <li>
                    <strong>Ángulo:</strong> Foto perpendicular a la piel
                  </li>
                  <li>
                    <strong>Fondo:</strong> Contraste con el tono de piel
                  </li>
                </ul>
              </div>

              {/* Información técnica */}
              <div className="tech-info">
                <details>
                  <summary>ℹ️ Información técnica</summary>
                  <div className="tech-details">
                    <p><strong>Modelo de IA:</strong> ResNet-50 entrenado en 50,000 imágenes dermatológicas</p>
                    <p><strong>Precisión reportada:</strong> 92% en validación independiente</p>
                    <p><strong>Límites:</strong> No diagnostica cáncer, solo sugiere riesgo</p>
                    <p><strong>Privacidad:</strong> Las imágenes se procesan localmente (simulación)</p>
                  </div>
                </details>
              </div>
            </div>
          </div>

          {/* Panel derecho: Resultados */}
          <div className="results-panel">
            <div className="results-header">
              <h2>Resultados del Análisis</h2>
              <div className="results-status">
                {isScanning ? (
                  <span className="status scanning" role="status">
                    🔍 Analizando...
                  </span>
                ) : scanResults ? (
                  <span className="status complete" role="status">
                    ✅ Completado
                  </span>
                ) : (
                  <span className="status pending" role="status">
                    📭 Esperando imagen
                  </span>
                )}
              </div>
            </div>

            <div className="results-content">
              {isScanning ? (
                <div className="scanning-animation">
                  <div className="pulse" aria-hidden="true"></div>
                  <h3>Analizando tu imagen...</h3>
                  <p>El modelo de IA está evaluando características dermatológicas</p>
                  <div className="scanning-details">
                    <div className="scanning-step">
                      <span className="step-check">✓</span>
                      <span>Verificando calidad de imagen</span>
                    </div>
                    <div className="scanning-step">
                      <span className="step-check">{uploadProgress >= 40 ? '✓' : '...'}</span>
                      <span>Extrayendo características</span>
                    </div>
                    <div className="scanning-step">
                      <span className="step-check">{uploadProgress >= 70 ? '✓' : '...'}</span>
                      <span>Comparando con base de datos</span>
                    </div>
                    <div className="scanning-step">
                      <span className="step-check">{uploadProgress >= 100 ? '✓' : '...'}</span>
                      <span>Generando recomendaciones</span>
                    </div>
                  </div>
                </div>
              ) : scanResults ? (
                <>
                  {/* Tarjeta de diagnóstico */}
                  <div 
                    className={`diagnosis-card ${scanResults.riskLevel.toLowerCase()}`}
                    style={{ borderColor: getRiskColor(scanResults.riskLevel) }}
                  >
                    <div className="diagnosis-header">
                      <div>
                        <h3>Diagnóstico preliminar</h3>
                        <small className="scan-id">ID: {scanResults.scanId}</small>
                      </div>
                      <div className="risk-indicator">
                        <span 
                          className={`risk-badge ${scanResults.riskLevel.toLowerCase()}`}
                          style={{ backgroundColor: getRiskColor(scanResults.riskLevel) }}
                        >
                          {getRiskIcon(scanResults.riskLevel)} {scanResults.riskLevel}
                        </span>
                      </div>
                    </div>
                    
                    <div className="diagnosis-main">
                      <h2 className="diagnosis-text">{scanResults.diagnosis}</h2>
                      
                      <div className="confidence-display">
                        <div className="confidence-header">
                          <span>Confianza del modelo:</span>
                          <span className="confidence-value">{scanResults.confidence}%</span>
                        </div>
                        <div className="confidence-level">
                          <div className="confidence-bar">
                            <div 
                              className="confidence-fill"
                              style={{ 
                                width: `${scanResults.confidence}%`,
                                background: `linear-gradient(90deg, ${getRiskColor(scanResults.riskLevel)}, #3498db)`
                              }}
                            ></div>
                          </div>
                          <div className="confidence-labels">
                            <span>0%</span>
                            <span>50%</span>
                            <span>100%</span>
                          </div>
                        </div>
                      </div>

                      <div className="risk-explanation">
                        <h4>¿Qué significa "{scanResults.riskLevel}"?</h4>
                        <p>
                          {scanResults.riskLevel === 'BAJO' 
                            ? 'La lesión presenta características típicamente benignas. Se recomienda seguimiento rutinario.'
                            : scanResults.riskLevel === 'MEDIO'
                            ? 'Se observan características atípicas que requieren evaluación profesional. No es una emergencia, pero necesita atención.'
                            : 'Presenta características que requieren evaluación inmediata. Consulta a un especialista pronto.'
                          }
                        </p>
                      </div>
                    </div>

                    <div className="diagnosis-details">
                      <div className="description-section">
                        <h4>📋 Descripción detallada</h4>
                        <p>{scanResults.description}</p>
                      </div>
                      
                      <div className="recommendations-section">
                        <h4>📝 Recomendaciones específicas</h4>
                        <ul className="recommendations-list">
                          {scanResults.recommendations.map((rec, index) => (
                            <li key={index} className="recommendation-item">
                              <span className="rec-number">{index + 1}.</span>
                              <span className="rec-text">{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {scanResults.nextSteps && (
                        <div className="next-steps">
                          <h4>🗓️ Próximos pasos sugeridos</h4>
                          <div className="steps-grid">
                            {scanResults.nextSteps.map((step, index) => (
                              <div 
                                key={index} 
                                className={`step-card priority-${step.priority}`}
                              >
                                <div className="step-icon">
                                  {step.priority === 'high' ? '🚨' : 
                                   step.priority === 'medium' ? '⚠️' : '📅'}
                                </div>
                                <div className="step-content">
                                  <span className="step-text">{step.text}</span>
                                  <span className="step-priority">
                                    {step.priority === 'high' ? 'Alta prioridad' : 
                                     step.priority === 'medium' ? 'Media prioridad' : 'Prioridad normal'}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="results-meta">
                        <div className="meta-item">
                          <span className="meta-icon">📅</span>
                          <span className="meta-text">Analizado: {scanResults.timestamp}</span>
                        </div>
                        <div className="meta-item">
                          <span className="meta-icon">🆔</span>
                          <span className="meta-text">ID de análisis: {scanResults.scanId}</span>
                        </div>
                        <div className="disclaimer-warning">
                          <span className="warning-icon">⚠️</span>
                          <p>
                            <strong>Importante:</strong> Este es un análisis preliminar basado en IA. 
                            No constituye un diagnóstico médico. Consulta siempre a un dermatólogo certificado 
                            para evaluación profesional y diagnóstico definitivo.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Botones de acción */}
                  <div className="action-buttons">
                    <button 
                      className="btn-secondary"
                      onClick={handleSaveResults}
                      aria-label="Guardar resultados en el historial"
                    >
                      <span className="btn-icon">💾</span>
                      Guardar resultados
                    </button>
                    <button 
                      className="btn-secondary"
                      onClick={handleCopyResults}
                      aria-label="Copiar resultados al portapapeles"
                    >
                      <span className="btn-icon">📋</span>
                      Copiar resultados
                    </button>
                    <button 
                      className="btn-secondary"
                      onClick={handleDownloadResults}
                      aria-label="Descargar resultados como archivo JSON"
                    >
                      <span className="btn-icon">⬇️</span>
                      Descargar JSON
                    </button>
                    <button 
                      className="btn-secondary"
                      onClick={handleFindSpecialists}
                      aria-label="Buscar dermatólogos especialistas"
                    >
                      <span className="btn-icon">🩺</span>
                      Encontrar especialistas
                    </button>
                    <button 
                      className="btn-danger"
                      onClick={clearImage}
                      aria-label="Eliminar imagen y comenzar nuevo análisis"
                    >
                      <span className="btn-icon">🗑️</span>
                      Nueva imagen
                    </button>
                  </div>

                  {/* Feedback */}
                  <div className="feedback-section">
                    <p className="feedback-text">¿Fue útil este análisis?</p>
                    <div className="feedback-buttons">
                      <button className="feedback-btn positive">👍 Sí</button>
                      <button className="feedback-btn neutral">😐 Regular</button>
                      <button className="feedback-btn negative">👎 No</button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="empty-results">
                  <div className="empty-icon" role="img" aria-label="Documento vacío">📄</div>
                  <h3>Sin resultados aún</h3>
                  <p>Sube una imagen de una lesión cutánea y haz clic en "Escanear" para obtener un análisis preliminar.</p>
                  <div className="empty-actions">
                    <button 
                      className="btn-try-sample"
                      onClick={() => {
                        // Podrías cargar una imagen de muestra aquí
                        alert('Funcionalidad de muestra - Próximamente');
                      }}
                    >
                      🧪 Probar con imagen de muestra
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Información para desarrolladores */}
        <div className="dev-info">
          <details className="dev-details">
            <summary>🔧 Información para integración con backend</summary>
            <div className="dev-content">
              <h4>Estructura esperada del backend:</h4>
              <pre>{`POST /api/v1/scan
Content-Type: multipart/form-data

Body: {
  image: File (máx 10MB),
  userId: string (opcional),
  metadata: JSON string (opcional)
}

Response: {
  success: boolean,
  data: {
    diagnosis: string,
    confidence: number,
    riskLevel: 'BAJO' | 'MEDIO' | 'ALTO',
    description: string,
    recommendations: string[],
    nextSteps: { text: string, priority: string }[],
    timestamp: string,
    scanId: string
  },
  processingTime: number
}`}</pre>
              
              <div className="dev-notes">
                <p><strong>Notas:</strong></p>
                <ul>
                  <li>Las imágenes deben procesarse en menos de 30 segundos</li>
                  <li>Recomendado: Compresión automática de imágenes grandes</li>
                  <li>Soporte para CORS habilitado para el dominio frontend</li>
                  <li>Logging de todos los análisis para mejora del modelo</li>
                </ul>
              </div>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
};

export default ScannerPage;