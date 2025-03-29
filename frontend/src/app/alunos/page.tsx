"use client";
import { useAddAlunoInTurma } from "@/hooks/addAlunoInTurma";
import { useDeleteAlunoOfTurma } from "@/hooks/useDeleteAlunoOfTurma";
import { useGetAluno } from "@/hooks/useGetAluno";
import { useGetTurmas } from "@/hooks/useGetTurmas";
import { useGetTurmasByAluno } from "@/hooks/useGetTurmasByAluno";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";

const AlunoPage = () => {
  const [id, setId] = useState<number>();
  const [matriculasState, setMatriculasState] = useState<any[]>([]);

  const queryClient = useQueryClient();

  const { data: aluno } = useGetAluno(id);
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
          alert("✅ Aluno removido com sucesso!");
          queryClient.invalidateQueries({ queryKey: ["turmasByAluno", id] });
          setMatriculasState((prev) =>
            prev.filter((m) => m.turmaId !== idTurma)
          );
        },
      }
    );
  }

  return (
    <div>
      <div>
        <h3>Bem-vindo, {aluno?.nome}</h3>

        <h4>Turmas Disponíveis</h4>
        <ul>
          {turmas?.map((turma) => (
            <li key={turma.id}>
              {`${turma.disciplina} - ${turma.professor} (${turma.turno})`}
              <button onClick={() => handleMatricula(turma.id)}>
                Matricular
              </button>
            </li>
          ))}
        </ul>

        <h4>Minhas Matrículas</h4>
        <ul>
          {matriculasState?.map(({ turma }) =>
            turma ? (
              <li key={turma.id}>
                {turma.disciplina} - {turma.professor} ({turma.turno})
                <button onClick={() => handleRemoverMatricula(turma.id)}>
                  Remover
                </button>
              </li>
            ) : null
          )}
        </ul>

        <button onClick={handleLogout}>Sair</button>
      </div>
    </div>
  );
};

export default AlunoPage;
