// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Alterado para 'react-dom/client'
import './index.css';
import App from './App';
import './styles.css';  // Importando o arquivo de CSS


const root = ReactDOM.createRoot(document.getElementById('root')); // Usa 'createRoot' ao invés de 'render'
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
