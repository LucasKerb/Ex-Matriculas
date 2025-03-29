/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/Components/Button";
import { ButtonSec } from "@/Components/ButtonSec";
import Header from "@/Components/NavBar";
import { useAddAlunoInTurma } from "@/hooks/addAlunoInTurma";
import { useDeleteAlunoOfTurma } from "@/hooks/useDeleteAlunoOfTurma";
import { useGetAluno } from "@/hooks/useGetAluno";
import { useGetTurmas } from "@/hooks/useGetTurmas";
import { useGetTurmasByAluno } from "@/hooks/useGetTurmasByAluno";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";

const AlunoPage = () => {
  const [id, setId] = useState<number>();
  const [matriculasState, setMatriculasState] = useState<any[]>([]);

  const queryClient = useQueryClient();

  const { data: aluno, isLoading } = useGetAluno(id);
  const { data: turmas } = useGetTurmas();
  const { data: matriculas, refetch: refetchMatriculas } =
    useGetTurmasByAluno(id);

  const { mutate } = useDeleteAlunoOfTurma();
  const { mutate: mutateAdd } = useAddAlunoInTurma();

  const router = useRouter();

  useLayoutEffect(() => {
    const alunoId = localStorage.getItem("idAluno");
    setId(Number(alunoId));
  }, []);

  useEffect(() => {
    if (matriculas) {
      setMatriculasState(matriculas);
    }
  }, [matriculas]);

  function handleLogout() {
    localStorage.removeItem("idAluno");
    router.push("/");
  }

  function handleMatricula(idTurma: number) {
    if (!id) return;

    const turmaSelecionada = turmas?.find((t) => t.id === idTurma);
    if (!turmaSelecionada) return;

    mutateAdd(
      { alunoId: id, turmaId: idTurma },
      {
        onError(error) {
          alert(`❌ Não foi possível adicionar a matrícula. Erro: ${error}`);
          refetchMatriculas();
        },
        onSuccess() {
          alert("✅ Aluno adicionado com sucesso!");
          queryClient.invalidateQueries({ queryKey: ["turmasByAluno", id] });
          queryClient.invalidateQueries({
            queryKey: ["useGetAllStudentsWithTurmas"],
          });
          setMatriculasState((prev) => [
            ...prev,
            {
              alunoId: id,
              turmaId: idTurma,
              turma: turmaSelecionada,
            },
          ]);
        },
      }
    );
  }

  function handleRemoverMatricula(idTurma: number) {
    if (!id) return;

    mutate(
      { alunoId: id, turmaId: idTurma },
      {
        onError(error) {
          alert(
            `❌ Não foi possível remover aluno da matrícula. Erro: ${error}`
          );
          refetchMatriculas();
        },
        onSuccess() {
          alert("✅ Matrícula removido com sucesso!");
          queryClient.invalidateQueries({ queryKey: ["turmasByAluno", id] });
          setMatriculasState((prev) =>
            prev.filter((m) => m.turmaId !== idTurma)
          );
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
      <h3 className="text-indigo-50 text-[30px] ">
        Bem-vindo, {isLoading ? "" : aluno?.nome}!
      </h3>

      <div className=" w-full flex justify-center gap-20 flex flex-row items-center overflow-auto gap-5">
        <div className="flex flex-col">
          <h4 className="text-indigo-50 text-[30px]">Turmas Disponíveis</h4>
          <ul>
            {turmas?.map((turma) => (
              <li
                key={turma.id}
                className="text-indigo-50 text-[20px] list-disc"
              >
                {`${turma.disciplina} - ${turma.professor} (${turma.turno})`}
                <ButtonSec onClick={() => handleMatricula(Number(turma.id))}>
                  Matricular
                </ButtonSec>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-px h-full bg-indigo-50"></div>

        <div className="flex flex-col">
          <h4 className="text-indigo-50 text-[30px] ">Minhas Matrículas</h4>
          <ul>
            {matriculasState?.map(({ turma }) =>
              turma ? (
                <li
                  className="text-indigo-50 text-[20px] list-decimal"
                  key={turma.id}
                >
                  {turma.disciplina} - {turma.professor} ({turma.turno})
                  <ButtonSec onClick={() => handleRemoverMatricula(turma.id)}>
                    Remover
                  </ButtonSec>
                </li>
              ) : null
            )}
          </ul>
        </div>
      </div>
      <div className="mt-50">
        <Button onClick={handleLogout}>Sair</Button>
      </div>
    </div>
  );
};

export default AlunoPage;
