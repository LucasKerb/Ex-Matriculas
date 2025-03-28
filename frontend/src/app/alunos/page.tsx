"use client"
//imports
import React, { useState, useEffect } from 'react';
import { useGetAluno } from '@/hooks/useGetAluno'
import { useGetTurmas } from '@/hooks/useGetTurmas'


const AlunoPage = () => {
  const [id, setId] = useState<number>();
  const [aluno, setAluno] = useState(null);
  const [matriculas, setMatriculas] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const { data } = useGetAluno(id ?? 0);
  const { data: turmas, isLoading } = useGetTurmas();

  useEffect(() => {
    const alunoId = localStorage.getItem('alunoId');
    const id = Number(alunoId);

    setId(id);
  }, [])

  return (
    <div>
      <div>
        <h3>Bem-vindo, {data?.nome}</h3>
        <h4>Turmas Disponíveis</h4>
        <ul>
          {turmas?.map((turma) => (
            <li key={turma.id}>
              {turma.disciplina} - {turma.professor} ({turma.turno ? ''})
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
