/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { TurmaDto } from "@/api/classesApi";
import { Button } from "@/Components/Button";
import { ButtonSec } from "@/Components/ButtonSec";
import Header from "@/Components/NavBar";
import { useCreateClass } from "@/hooks/useCreateClass";
import { useDeleteAluno } from "@/hooks/useDeleteAluno";
import { useDeleteTurma } from "@/hooks/useDeleteTurma";
import { useGetAllStudentsWithTurmas } from "@/hooks/useGetAllStudentsWithTurmas";
import { useGetTurmas } from "@/hooks/useGetTurmas";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";

const AdminPage = () => {
  const [disciplina, setDisciplina] = useState("");
  const [professor, setProfessor] = useState("");
  const [diaSemana, setDiaSemana] = useState("");
  const [turno, setTurno] = useState<number | null>(null);

  const queryClient = useQueryClient();

  const { mutate: createClass } = useCreateClass();
  const { data: turmas, isLoading: isLoadingTurmas } = useGetTurmas();
  const {
    data: dataAlunos,
    isLoading: isLoadingDataAlunos,
    refetch,
  } = useGetAllStudentsWithTurmas();
  const { mutate } = useDeleteTurma();
  const { mutate: deleteAluno } = useDeleteAluno();

  const [turmasState, setTurmasState] = useState<TurmaDto[]>([]);
  // const [alunosState, setAlunosState] = useState<AlunoComTurmasDto[]>([]);

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["useGetTurmas"] });
    if (turmas) {
      setTurmasState(turmas);
    }
  }, [isLoadingTurmas]);

  useEffect(() => {
    refetch();
    queryClient.invalidateQueries({
      queryKey: ["useGetAllStudentsWithTurmas"],
    });
  }, [isLoadingDataAlunos]);

  function handleCreateClass() {
    if (!disciplina || !professor || !diaSemana || !turno) {
      alert("Todos campos precisam estar preenchidos!");
      return;
    }
    createClass(
      { dia: diaSemana, disciplina, professor, turno },
      {
        onError(error) {
          alert(`❌ Não foi possível adicionar a classe, erro: ${error}`);
        },
        onSuccess(data) {
          alert("✅  Classe adicionada com sucesso!");
          setTurmasState((prev) => [...prev, data]);
          queryClient.invalidateQueries({ queryKey: ["useGetTurmas"] });
          queryClient.invalidateQueries({
            queryKey: ["useGetAllStudentsWithTurmas"],
          });
        },
      }
    );
  }

  function handleDeleteClass(id: number) {
    mutate(
      { id },
      {
        onError(error) {
          alert(`❌ Não foi possível remover a classe, erro: ${error}`);
          queryClient.invalidateQueries({ queryKey: ["useGetTurmas"] });
        },
        onSuccess() {
          alert("✅ Classe removida com sucesso!");
          queryClient.invalidateQueries({ queryKey: ["useGetTurmas"] });
          queryClient.invalidateQueries({
            queryKey: ["useGetAllStudentsWithTurmas"],
          });
          setTurmasState((prev) => prev.filter((turma) => turma.id !== id));
        },
      }
    );
  }

  function handleDeleteAluno(id: number) {
    deleteAluno(
      { id },
      {
        onError(error) {
          alert(`❌ Não foi possível remover o aluno, erro: ${error}`);
          queryClient.invalidateQueries({ queryKey: ["useGetTurmas"] });
        },
        onSuccess() {
          alert("✅ Aluno removido com sucesso!");
          queryClient.invalidateQueries({ queryKey: ["useGetTurmas"] });
          queryClient.invalidateQueries({
            queryKey: ["useGetAllStudentsWithTurmas"],
          });
        },
      }
    );
  }

  return (
    <div className="w-full h-screen size-500 rounded-none bg-radial-[at_50%_75%] from-sky-400 via-blue-500 to-slate-950 to-90%size-500 rounded-none bg-radial-[at_25%_25%] from sky-400 via-blue-500 to-slate-950 to-75% text-indigo-500 flex flex-col items-center overflow-auto gap-5">
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
      <h3 className="text-indigo-50 text-[30px] ">Bem-vindo, Administrador </h3>

      <div className=" w-full flex justify-center gap-20 flex flex-row items-center overflow-auto gap-5">
        <div className="flex flex-col">
          <h3 className="text-indigo-50 text-[30px]">Criar Turma</h3>
          <input
            className="inset-ring inset-ring-indigo-50 p-1 w-50 text-stone-200"
            type="text"
            placeholder="Disciplina"
            value={disciplina}
            onChange={(e) => setDisciplina(e.target.value)}
          />
          <input
            className="inset-ring inset-ring-indigo-50 p-1 w-50 text-stone-200"
            type="text"
            placeholder="Professor"
            value={professor}
            onChange={(e) => setProfessor(e.target.value)}
          />
          <select
            className="inset-ring inset-ring-indigo-50 p-1 w-50 text-stone-200"
            value={diaSemana}
            onChange={(e) => setDiaSemana(e.target.value)}
          >
            <option className="text-gray-950" value="">
              Dia da Semana
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
            className="inset-ring inset-ring-indigo-50 p-1 w-50 text-stone-200"
            value={turno ?? ""}
            onChange={(e) => setTurno(Number(e.target.value))}
          >
            <option className="text-gray-950" value="" hidden disabled>
              Turno
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
        </div>
        <div className="w-px h-full bg-indigo-50"></div>
        <div className="flex flex-col">
          <h3 className="text-indigo-50 text-[30px]">Turmas Criadas</h3>
          <ul>
            {turmasState?.map(({ dia, disciplina, id, professor, turno }) => (
              <li key={id} className="list-decimal text-[20px] text-stone-200">
                {disciplina} - {professor} ({dia}, {turno})
                <ButtonSec onClick={() => handleDeleteClass(Number(id))}>
                  Excluir
                </ButtonSec>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-px h-full bg-indigo-50"></div>
        <div className="flex flex-col">
          <h3 className="text-indigo-50 text-[30px]">Alunos Cadastrados</h3>
          <ul>
            {!dataAlunos
              ? ""
              : dataAlunos?.map(({ id, nome, turmas }) => {
                  console.log({ id, nome, turmas });
                  return (
                    <li
                      key={id}
                      className="text-[20px] list-disc text-stone-200"
                    >
                      {nome} ({turmas.length} turmas)
                      <ButtonSec onClick={() => handleDeleteAluno(id)}>
                        Excluir
                      </ButtonSec>
                      <ul>
                        {turmas?.map(
                          ({ id, dia, disciplina, professor, turno }) => (
                            <li key={id} className="text-[20px] list-decimal ">
                              {disciplina} - {professor} ({dia}, {turno})
                            </li>
                          )
                        )}
                      </ul>
                    </li>
                  );
                })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
