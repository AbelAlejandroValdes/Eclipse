# 1. Crear el proyecto React
## Crear el proyecto con Vite (más rápido que create-react-app)
npm create vite@latest skin-cancer-ai -- --template react
cd skin-cancer-ai

## Instalar dependencias básicas
npm install

# 2. Estructura del proyecto

skin-cancer-ai/
├── src/
│   ├── components/
│   │   ├── Scanner/
│   │   │   ├── ImageUploader.jsx
│   │   │   ├── ResultDisplay.jsx
│   │   │   └── ScannerPage.jsx
│   │   └── Layout/
│   │       └── Header.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   └── ScannerPage.jsx
│   ├── services/
│   │   └── mockApi.js
│   ├── styles/
│   │   └── scanner.css
│   ├── App.jsx
│   └── main.jsx
├── public/
└── package.json

# 3. Instalar dependencias adicionales

## Para manejo de formularios y estado
npm install axios react-dropzone

## Para iconos (opcional pero recomendado)
npm install react-icons

## Para animaciones (opcional)
npm install framer-motion

## Para manejo de fechas (si es necesario)
npm install date-fns
