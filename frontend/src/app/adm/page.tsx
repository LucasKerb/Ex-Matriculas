"use client";
import { Button } from "@/Components/Button";
import { ButtonSec } from "@/Components/ButtonSec";
import Header from "@/Components/NavBar";
import { useCreateClass } from "@/hooks/useCreateClass";
import { useGetAllStudentsWithTurmas } from "@/hooks/useGetAllStudentsWithTurmas";
import { useGetTurmas } from "@/hooks/useGetTurmas";
import Image from "next/image";
import { useState } from "react";

const AdminPage = () => {
  const [disciplina, setDisciplina] = useState("");
  const [professor, setProfessor] = useState("");
  const [diaSemana, setDiaSemana] = useState("");
  const [turno, setTurno] = useState<number | null>(null);

  const { mutate: createClass } = useCreateClass();
  const { data: turmas, refetch: refetchTurmas } = useGetTurmas();
  const { data: dataAlunos } = useGetAllStudentsWithTurmas();

  function handleCreateClass() {
    if (!disciplina || !professor || !diaSemana || !turno) {
      alert("Todos campos precisam estar preenchidos!");
      return;
    }
    createClass(
      { dia: diaSemana, disciplina, professor, turno },
      {
        onError(error) {
          alert(`Não foi possível adicionar a classe, erro: ${error}`);
        },
        onSuccess() {
          alert("Aluno adicionado com sucesso!");
          refetchTurmas();
        },
      }
    );
  }

  return (
    <div className="overflow-auto w-full h-screen bg-gradient-to-r from-sky-400 via-blue-500 to-slate-950 text-indigo-50 flex flex-col gap-2 grid place-content-start md:place-content-center ">
      <Header />
      <Image
        style={{ cursor: "pointer" }}
        alt="img"
        src="/logo.png"
        width={200}
        height={200}
        onClick={() =>
          window.open("https://ead.unisinos.br/area-do-aluno", "_blank")
        }
      />
      <h3 className="text-indigo-50 text-[30px] grid place-content-start">
        Criar Turma
      </h3>
      <input
        className="inset-ring inset-ring-indigo-50 p-1 w-80 text-stone-200"
        type="text"
        placeholder="Disciplina"
        value={disciplina}
        onChange={(e) => setDisciplina(e.target.value)}
      />
      <input
        className="inset-ring inset-ring-indigo-50 p-1 w-80 text-stone-200"
        type="text"
        placeholder="Professor"
        value={professor}
        onChange={(e) => setProfessor(e.target.value)}
      />
      <select
        className="inset-ring inset-ring-indigo-50 p-1 w-80 text-stone-200"
        value={diaSemana}
        onChange={(e) => setDiaSemana(e.target.value)}
      >
        <option className="text-gray-950" value="">
          Selecione o Dia da Semana
        </option>
        <option className="text-gray-950" value="Segunda-feira">
          Segunda-feira
        </option>
        <option className="text-gray-950" value="Terça-feira">
          Terça-feira
        </option>
        <option className="text-gray-950" value="Quarta-feira">
          Quarta-feira
        </option>
        <option className="text-gray-950" value="Quinta-feira">
          Quinta-feira
        </option>
        <option className="text-gray-950" value="Sexta-feira">
          Sexta-feira
        </option>
      </select>
      <select
        className="inset-ring inset-ring-indigo-50 p-1 w-80 text-stone-200"
        value={turno ?? ""}
        onChange={(e) => setTurno(Number(e.target.value))}
      >
        <option className="text-gray-950" value="" disabled hidden>
          Selecione o Turno
        </option>
        <option className="text-gray-950" value={1}>
          Manhã
        </option>
        <option className="text-gray-950" value={2}>
          Tarde
        </option>
        <option className="text-gray-950" value={3}>
          Noite
        </option>
      </select>
      <Button onClick={handleCreateClass}>Criar</Button>

      <h3 className="text-indigo-50 text-[30px]">Turmas Criadas</h3>
      <ul>
        {turmas?.map((turma) => (
          <li key={turma.id} className="list-decimal text-[20px]">
            {turma.disciplina} - {turma.professor} ({turma.dia}, {turma.turno})
            <ButtonSec onClick={() => {}}>Excluir</ButtonSec>
          </li>
        ))}
      </ul>

      <h3 className="text-indigo-50 text-[30px]">Alunos Cadastrados</h3>
      <ul>
        {dataAlunos?.map(({ nome, id, turmas }) => (
          <li key={id} className="text-[20px] list-disc">
            {nome} ({turmas.length} turmas)
            <ButtonSec onClick={() => {}}>Excluir</ButtonSec>
            <ul>
              {turmas?.map(
                ({ turma: { dia, disciplina, id, professor, turno } }) => (
                  <li key={id} className="text-[20px] list-decimal">
                    {disciplina} - {professor} ({dia}, {turno})
                  </li>
                )
              )}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
