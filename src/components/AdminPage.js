import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [disciplina, setDisciplina] = useState('');
  const [professor, setProfessor] = useState('');
  const [diaSemana, setDiaSemana] = useState('');
  const [turno, setTurno] = useState('');
  const [turmas, setTurmas] = useState([]);
  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    // Carregar turmas existentes
    axios.get('http://localhost:5000/api/matriculas')
      .then(response => setTurmas(response.data))
      .catch(error => console.error("Erro ao carregar turmas:", error));

    // Carregar todos os alunos
    axios.get('http://localhost:5000/api/alunos')
      .then(response => setAlunos(response.data))
      .catch(error => console.error("Erro ao carregar alunos:", error));
  }, []);

  const handleCreateTurma = () => {
    if (disciplina && professor && diaSemana && turno) {
      axios.post('http://localhost:5000/api/matriculas', { disciplina, professor, diaSemana, turno })
        .then(response => {
          setTurmas([...turmas, response.data]);
          setDisciplina('');
          setProfessor('');
          setDiaSemana('');
          setTurno('');
        })
        .catch(error => alert("Erro ao criar turma: " + error.response.data.error));
    } else {
      alert('Por favor, preencha todos os campos!');
    }
  };

  const handleDeleteTurma = (id) => {
    axios.delete(`http://localhost:5000/api/matriculas/${id}`)
      .then(response => {
        setTurmas(turmas.filter(turma => turma.id !== id));
        alert('Turma excluída com sucesso!');
      })
      .catch(error => alert('Erro ao excluir turma: ' + error.response.data.error));
  };

  const handleDeleteAluno = (id) => {
    axios.delete(`http://localhost:5000/api/alunos/${id}`)
      .then(response => {
        setAlunos(alunos.filter(aluno => aluno.id !== id));  // Remove o aluno da lista
        alert('Aluno excluído com sucesso!');
      })
      .catch(error => {
        console.error('Erro ao excluir aluno:', error);
        alert('Erro ao excluir aluno');
      });
  };
  
  

  return (
    <div>
      <h3>Criar Turma</h3>
      <input
        type="text"
        placeholder="Disciplina"
        value={disciplina}
        onChange={(e) => setDisciplina(e.target.value)}
      />
      <input
        type="text"
        placeholder="Professor"
        value={professor}
        onChange={(e) => setProfessor(e.target.value)}
      />
      <select
        value={diaSemana}
        onChange={(e) => setDiaSemana(e.target.value)}
      >
        <option value="">Selecione o Dia da Semana</option>
        <option value="Segunda-feira">Segunda-feira</option>
        <option value="Terça-feira">Terça-feira</option>
        <option value="Quarta-feira">Quarta-feira</option>
        <option value="Quinta-feira">Quinta-feira</option>
        <option value="Sexta-feira">Sexta-feira</option>
      </select>
      <select
        value={turno}
        onChange={(e) => setTurno(e.target.value)}
      >
        <option value="">Selecione o Turno</option>
        <option value="Manhã">Manhã</option>
        <option value="Tarde">Tarde</option>
        <option value="Noite">Noite</option>
      </select>
      <button onClick={handleCreateTurma}>Criar</button>

      <h3>Turmas Criadas</h3>
        <ul>
        {turmas.map(turma => (
            <li key={turma.id}>
            {turma.disciplina} - {turma.professor} ({turma.diaSemana}, {turma.turno})
            <button onClick={() => handleDeleteTurma(turma.id)}>Excluir</button>
            </li>
        ))}
        </ul>


        <h3>Alunos Cadastrados</h3>
        <ul>
        {alunos.map(aluno => (
            <li key={aluno.id}>
            {aluno.nome} ({aluno.matriculas.length} turmas)
            <button onClick={() => handleDeleteAluno(aluno.id)}>Excluir</button>
            <ul>
                {aluno.matriculas.map(matricula => (
                <li key={matricula.id}>
                    {matricula.disciplina} - {matricula.professor} ({matricula.diaSemana}, {matricula.turno})
                </li>
                ))}
            </ul>
            </li>
        ))}
        </ul>

    </div>
  );
};

export default AdminPage;
