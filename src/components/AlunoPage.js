import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AlunoPage = () => {
  const [nome, setNome] = useState('');
  const [id, setId] = useState('');
  const [aluno, setAluno] = useState(null);
  const [turmas, setTurmas] = useState([]);
  const [matriculas, setMatriculas] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  // Carregar as turmas disponíveis e verificar se há um aluno logado no localStorage
  useEffect(() => {
    axios.get('http://localhost:5000/api/matriculas')
      .then(response => {
        setTurmas(response.data);
      })
      .catch(error => {
        console.error("Erro ao carregar turmas:", error);
        alert('Erro ao carregar turmas.');
      });

    // Verificar se há um aluno logado no localStorage
    const alunoLogado = JSON.parse(localStorage.getItem('aluno'));
    if (alunoLogado) {
      setAluno(alunoLogado);
      setMatriculas(alunoLogado.matriculas || []);
    }
  }, []); // O array vazio [] faz com que o efeito seja executado apenas uma vez após o primeiro render

  
  const handleMatricula = (turmaId) => {
    if (aluno) {
      axios.post('http://localhost:5000/api/matriculas/adicionar', { alunoId: aluno.id, turmaId })
        .then(response => {
          alert(response.data.message);
          
          // Adiciona o ID da turma ao estado de matrículas
          const novasMatriculas = [...matriculas, turmaId];
          setMatriculas(novasMatriculas);
  
          // Atualiza o estado do aluno e armazena no localStorage
          const alunoAtualizado = { ...aluno, matriculas: novasMatriculas };
          localStorage.setItem('aluno', JSON.stringify(alunoAtualizado)); 
        })
        .catch(error => {
          console.error("Erro ao matricular:", error);
          alert(error.response?.data?.error || 'Erro desconhecido');
        });
    } else {
      alert('Por favor, faça o login primeiro.');
    }
  };
  
  const handleRemoverMatricula = (turmaId) => {
    if (aluno) {
      axios.delete('http://localhost:5000/api/matriculas/remover', { data: { alunoId: aluno.id, turmaId } })
        .then(response => {
          alert(response.data.message);
          
          // Remove o ID da turma da lista de matrículas
          const novaListaMatriculas = matriculas.filter(id => id !== turmaId);
          setMatriculas(novaListaMatriculas);
  
          // Atualiza o estado do aluno e armazena no localStorage
          const alunoAtualizado = { ...aluno, matriculas: novaListaMatriculas };
          localStorage.setItem('aluno', JSON.stringify(alunoAtualizado)); 
        })
        .catch(error => {
          console.error("Erro ao remover matrícula:", error);
          alert(error.response?.data?.error || 'Erro desconhecido');
        });
    } else {
      alert('Por favor, faça o login primeiro.');
    }
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
