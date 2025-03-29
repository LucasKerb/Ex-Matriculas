'use client';
import { Button } from '@/Components/Button';
import { ButtonSec } from '@/Components/ButtonSec';
import Header from '@/Components/NavBar';
import Image from 'next/image';
import { useState } from 'react';

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
    <div className="w-full h-screen size-500 rounded-none bg-radial-[at_50%_75%] from-sky-400 via-blue-500 to-slate-950 to-90%size-500 rounded-none bg-radial-[at_25%_25%] from sky-400 via-blue-500 to-slate-950 to-75% text-indigo-500 flex flex-col items-center overflow-auto gap-5">
      <Header/>
      <Image style={{ cursor: 'pointer' }} alt='img' src="/logo.png" width={200} height={200}  onClick={() => window.open('https://ead.unisinos.br/area-do-aluno', '_blank')}/>
      <h3 className="text-indigo-50 text-[30px] ">Bem-vindo, Administrador </h3>

      <div className=" w-full flex justify-center gap-20 flex flex-row items-center overflow-auto gap-5">
      <div className="flex flex-col">

      <h3 className="text-indigo-50 text-[30px]">Criar Turma</h3>
      <input className="inset-ring inset-ring-indigo-50 p-1 w-50 text-stone-200"
        type="text"
        placeholder="Disciplina"
        value={disciplina}
        onChange={(e) => setDisciplina(e.target.value)}
        />
      <input className="inset-ring inset-ring-indigo-50 p-1 w-50 text-stone-200"
        type="text"
        placeholder="Professor"
        value={professor}
        onChange={(e) => setProfessor(e.target.value)}
        />
      <select className="inset-ring inset-ring-indigo-50 p-1 w-50 text-stone-200"
        value={diaSemana}
        onChange={(e) => setDiaSemana(e.target.value)}
        >
        <option className="text-gray-950" value="">Dia da Semana</option>
        <option className="text-gray-950" value="Segunda-feira">Segunda-feira</option>
        <option className="text-gray-950" value="Terça-feira">Terça-feira</option>
        <option className="text-gray-950" value="Quarta-feira">Quarta-feira</option>
        <option className="text-gray-950" value="Quinta-feira">Quinta-feira</option>
        <option className="text-gray-950" value="Sexta-feira">Sexta-feira</option>
      </select>
      <select className="inset-ring inset-ring-indigo-50 p-1 w-50 text-stone-200"
        value={turno}
        onChange={(e) => setTurno(e.target.value)}
        >
        <option className="text-gray-950" value="">Turno</option>
        <option className="text-gray-950" value="Manhã">Manhã</option>
        <option className="text-gray-950" value="Tarde">Tarde</option>
        <option className="text-gray-950" value="Noite">Noite</option>
      </select>
      <Button onClick={() => {}}>Criar</Button>
        </div>
        <div className="w-px h-full bg-indigo-50"></div>
      <div className="flex flex-col">

      <h3 className="text-indigo-50 text-[30px]">Turmas Criadas</h3>
        <ul>
        {turmas.map(turma => (
          <li key={turma.id} className="list-decimal text-[20px] text-stone-200">
            {turma.disciplina} - {turma.professor} ({turma.diaSemana}, {turma.turno})
            <ButtonSec onClick={() => {}}>Excluir</ButtonSec>
            </li>
        ))}
        </ul>

        </div>
        <div className="w-px h-full bg-indigo-50"></div>
          <div className="flex flex-col">

        <h3 className="text-indigo-50 text-[30px]">Alunos Cadastrados</h3>
        <ul>
        {alunos.map(aluno => (
          <li key={aluno.id} className="text-[20px] list-disc text-stone-200">
            {aluno.nome} ({aluno.matriculas.length} turmas)
            <ButtonSec onClick={() => {}}>Excluir</ButtonSec>
            <ul>
                {aluno.matriculas.map(matricula => (
                  <li key={matricula.id} className="text-[20px] list-decimal ">
                    {matricula.disciplina} - {matricula.professor} ({matricula.diaSemana}, {matricula.turno})
                </li>
                ))}
            </ul>
            </li>
        ))}
        </ul>
        </div>

        </div>
      </div>
  );
};

export default AdminPage;
