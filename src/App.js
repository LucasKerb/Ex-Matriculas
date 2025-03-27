// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import AlunoPage from './components/AlunoPage';
import AdminPage from './components/AdminPage';
import LoginPage from './components/LoginPage';

const App = () => {
  return (
    <Router>
      <Header />
      <div className="container mt-4">
        <Routes>
          <Route path="/aluno" element={<AlunoPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/" element={<LoginPage />}   />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
