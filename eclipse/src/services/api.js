import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Cambiar según tu backend

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 segundos timeout
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const scanImage = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);
    
    const response = await api.post('/scan', formData, {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        // Puedes usar un estado global o callback para el progreso
        console.log(`Progreso: ${percentCompleted}%`);
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Error scanning image:', error);
    throw error;
  }
};

export const saveResults = async (results) => {
  try {
    const response = await api.post('/results/save', results);
    return response.data;
  } catch (error) {
    console.error('Error saving results:', error);
    throw error;
  }
};

export const getScanHistory = async () => {
  try {
    const response = await api.get('/results/history');
    return response.data;
  } catch (error) {
    console.error('Error fetching history:', error);
    throw error;
  }
};