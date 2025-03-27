// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Sistema de Matrículas</Link>
        <div className="navbar-nav ml-auto">
          <Link className="nav-link" to="/aluno">Aluno</Link>
          <Link className="nav-link" to="/admin">Administrador</Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
