"use client";
import { useAddAlunoInTurma } from "@/hooks/addAlunoInTurma";
import { useDeleteAlunoOfTurma } from "@/hooks/useDeleteAlunoOfTurma";
//imports
import { useGetAluno } from "@/hooks/useGetAluno";
import { useGetTurmas } from "@/hooks/useGetTurmas";
import { useGetTurmasByAluno } from "@/hooks/useGetTurmasByAluno";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useState } from "react";

const AlunoPage = () => {
  const [id, setId] = useState<number>();

  const { data } = useGetAluno(id);
  const { data: turmas } = useGetTurmas();
  const { data: matriculas, refetch: refetchMatriculas } =
    useGetTurmasByAluno(id);
  const { mutate } = useDeleteAlunoOfTurma();
  const { mutate: mutateAdd } = useAddAlunoInTurma();

  const router = useRouter();

  useLayoutEffect(() => {
    const alunoId = localStorage.getItem("idAluno");
    const id = Number(alunoId);

    setId(id);
  }, []);

  function handleLogout() {
    localStorage.removeItem("idAluno");
    router.push("/");
  }

  function handleMatricula(idTurma: number) {
    if (!id) return;
    mutateAdd(
      { alunoId: id, turmaId: idTurma },
      {
        onError(error) {
          alert(`Não foi possível adicionar a matrícula, erro: ${error}`);
        },
        onSuccess() {
          alert("Aluno adicionado com sucesso!");
          refetchMatriculas();
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
          alert(`Não foi possível remover aluno da matrícula, erro: ${error}`);
        },
        onSuccess() {
          alert("Aluno removido com sucesso!");
          refetchMatriculas();
        },
      }
    );
  }

  return (
    <div>
      <div>
        <h3>Bem-vindo, {data?.nome}</h3>
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
          {matriculas?.map(({ turma }) => {
            return turma ? (
              <li key={turma.id}>
                {turma.disciplina} - {turma.professor} ({turma.turno})
                <button onClick={() => handleRemoverMatricula(turma.id)}>
                  Remover
                </button>
              </li>
            ) : null;
          })}
        </ul>

        <button onClick={handleLogout}>Sair</button>
      </div>
    </div>
  );
};

export default AlunoPage;
