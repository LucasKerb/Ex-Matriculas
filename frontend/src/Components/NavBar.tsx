// src/components/Header.js
import React from 'react';
import Link from 'next/link'
import { Button } from './Button';
import { useRouter } from 'next/navigation';


const Header = () => {
    const router = useRouter();
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid flex flex-row gap-2">
        <Button  onClick={() => router.push('/')}>Sistema de Matrículas</Button>
        <Button  onClick={() => router.push('/alunos')}>Aluno</Button>
        <Button  onClick={() => router.push('/adm')}>Administrador</Button>
      </div>
    </nav>
  );
};

export default Header;