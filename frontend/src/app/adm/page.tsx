'use client';
import { Button } from '@/Components/Button';
import { ButtonSec } from '@/Components/ButtonSec';
import Header from '@/Components/NavBar';
import Image from 'next/image';
import React, { useState } from 'react';

const AdminPage = () => {
  const [disciplina, setDisciplina] = useState('');
  const [professor, setProfessor] = useState('');
  const [diaSemana, setDiaSemana] = useState('');
  const [turno, setTurno] = useState('');
  const [aluno, setAluno] = useState({
    id: 1,
    nome: 'Teste',
  })
  const [alunos, setAlunos] = useState([{
    id: 1,
    nome: 'Teste',
    matriculas: [{ id: 1, disciplina: 'd', professor: 'd', diaSemana: 1, turno: 1 }]
  }])
  const [turmas, setTurmas] = useState([
    {
      id: 1,
      disciplina: 'Matematica',
      professor: 'Romario',
      diaSemana: 'segunda',
      turno: 1
    },
    {
      id: 2,
      disciplina: 'Matematica',
      professor: 'Romario',
      diaSemana: 'segunda',
      turno: 1
    },
    {
      id: 3,
      disciplina: 'Matematica',
      professor: 'Romario',
      diaSemana: 'segunda',
      turno: 1
    }
  ]
  );

  const [turma, setTurma] = useState(
    {
      id: 1,
      disciplina: 'Matematica',
      professor: 'Romario',
      diaSemana: 'segunda',
      turno: 1
    },
  );


  return (
    <div className="overflow-auto w-full h-screen bg-gradient-to-r from-sky-400 via-blue-500 to-slate-950 text-indigo-50 flex flex-col gap-2 grid place-content-start md:place-content-center ">
      <Header/>
      <Image style={{ cursor: 'pointer' }} alt='img' src="/logo.png" width={200} height={200}  onClick={() => window.open('https://ead.unisinos.br/area-do-aluno', '_blank')}/>
      <h3 className="text-indigo-50 text-[30px] grid place-content-start">Criar Turma</h3>
      <input className="inset-ring inset-ring-indigo-50 p-1 w-80 text-stone-200"
        type="text"
        placeholder="Disciplina"
        value={disciplina}
        onChange={(e) => setDisciplina(e.target.value)}
      />
      <input className="inset-ring inset-ring-indigo-50 p-1 w-80 text-stone-200"
        type="text"
        placeholder="Professor"
        value={professor}
        onChange={(e) => setProfessor(e.target.value)}
      />
      <select className="inset-ring inset-ring-indigo-50 p-1 w-80 text-stone-200"
        value={diaSemana}
        onChange={(e) => setDiaSemana(e.target.value)}
      >
        <option className="text-gray-950" value="">Selecione o Dia da Semana</option>
        <option className="text-gray-950" value="Segunda-feira">Segunda-feira</option>
        <option className="text-gray-950" value="Terça-feira">Terça-feira</option>
        <option className="text-gray-950" value="Quarta-feira">Quarta-feira</option>
        <option className="text-gray-950" value="Quinta-feira">Quinta-feira</option>
        <option className="text-gray-950" value="Sexta-feira">Sexta-feira</option>
      </select>
      <select className="inset-ring inset-ring-indigo-50 p-1 w-80 text-stone-200"
        value={turno}
        onChange={(e) => setTurno(e.target.value)}
      >
        <option className="text-gray-950" value="">Selecione o Turno</option>
        <option className="text-gray-950" value="Manhã">Manhã</option>
        <option className="text-gray-950" value="Tarde">Tarde</option>
        <option className="text-gray-950" value="Noite">Noite</option>
      </select>
      <Button onClick={() => {}}>Criar</Button>

      <h3 className="text-indigo-50 text-[30px]">Turmas Criadas</h3>
        <ul>
        {turmas.map(turma => (
            <li key={turma.id} className="list-decimal text-[20px]">
            {turma.disciplina} - {turma.professor} ({turma.diaSemana}, {turma.turno})
            <ButtonSec onClick={() => {}}>Excluir</ButtonSec>
            </li>
        ))}
        </ul>

        <h3 className="text-indigo-50 text-[30px]">Alunos Cadastrados</h3>
        <ul>
        {alunos.map(aluno => (
            <li key={aluno.id} className="text-[20px] list-disc">
            {aluno.nome} ({aluno.matriculas.length} turmas)
            <ButtonSec onClick={() => {}}>Excluir</ButtonSec>
            <ul>
                {aluno.matriculas.map(matricula => (
                <li key={matricula.id} className="text-[20px] list-decimal">
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
