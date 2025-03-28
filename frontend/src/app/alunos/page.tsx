"use client"
//imports
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAxios } from '@/hooks/useAxios';

//exports
export interface AlunoProps {
    nome: string;
    id: number;
}

export interface TurmaProps {
    professor: string;
    disciplina: string;
    dia: "segunda" | "terca" | "quarta" | "quinta" | "sexta";
    turno: "manha" | "tarde" | "noite";
}

export interface AlunoTurmaProps {
    idAluno: number;
    idTurma: number;
}

const AlunoPage = () => {
  const [nome, setNome] = useState('');
  const [id, setId] = useState('');
  const [aluno, setAluno] = useState(null);
  const [turmas, setTurmas] = useState([]);
  const [matriculas, setMatriculas] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  // Carregar as turmas disponíveis e verificar se há um aluno logado no localStorage
  const { data, loading, error } = useAxios({ method: "GET", url: 'http://localhost:5000/api/matriculas' });

  
  
  const handleMatricula = (turmaId) => {
  const { data, loading, error } = useAxios({ method: "GET", url: 'http://localhost:5000/api/matriculas/adicionar', body: { alunoId: aluno.id, turmaId }});
  };
  
  const handleRemoverMatricula = (turmaId) => {
  const { data, loading, error } = useAxios({ method: "GET", url: 'http://localhost:5000/api/matriculas/remover', body: { alunoId: aluno.id, turmaId }});
  };
  

  const handleLogout = () => {
    setAluno(null);
    setMatriculas([]); // Limpar as matrículas também
    localStorage.removeItem('aluno'); // Limpar o aluno do localStorage
  };

  return (
    <div>
      <div>
        <h3>Bem-vindo, {aluno.nome}</h3>
        <h4>Turmas Disponíveis</h4>
        <ul>
          {turmas.map(turma => (
            <li key={turma.id}>
              {turma.disciplina} - {turma.professor} ({turma.horario})
              <button onClick={() => handleMatricula(turma.id)}>Matricular</button>
            </li>
          ))}
        </ul>

        <h4>Minhas Matrículas</h4>
          <ul>
          {matriculas.map(matriculaId => {
              const turma = turmas.find(t => t.id === matriculaId); // Encontre a turma pelo ID
              return turma ? (
              <li key={turma.id}>
                  {turma.disciplina} - {turma.professor} ({turma.horario})
                  <button onClick={() => handleRemoverMatricula(turma.id)}>Remover</button>
              </li>
              ) : null;
          })}
          </ul>


        <button onClick={handleLogout}>Sair</button>
      </div>
    </div>
  );
}

export default AlunoPage;
