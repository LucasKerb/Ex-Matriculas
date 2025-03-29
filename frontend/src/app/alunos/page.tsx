"use client";
import { Button } from "@/Components/Button";
import { ButtonSec } from "@/Components/ButtonSec";
import Header from "@/Components/NavBar";
import { useAddAlunoInTurma } from "@/hooks/addAlunoInTurma";
import { useDeleteAlunoOfTurma } from "@/hooks/useDeleteAlunoOfTurma";
//imports
import { useGetAluno } from "@/hooks/useGetAluno";
import { useGetTurmas } from "@/hooks/useGetTurmas";
import { useGetTurmasByAluno } from "@/hooks/useGetTurmasByAluno";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useState } from "react";

const AlunoPage = () => {
  const [id, setId] = useState<number>(0);

  const { data } = useGetAluno(id ?? 0);
  const { data: turmas } = useGetTurmas();
  const { data: matriculas } = useGetTurmasByAluno(id ?? 0);
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
    localStorage.removeItem("isLoged");
    router.push("/");
  }

  function handleMatricula(idTurma: number) {
    mutateAdd(
      { alunoId: id, turmaId: idTurma },
      {
        onError(error) {
          alert(`Não foi possível adicionar a matrícula, erro: ${error}`);
        },
        onSuccess() {
          alert("Aluno adicionado com sucesso!");
        },
      }
    );
  }

  function handleRemoverMatricula(idTurma: number) {
    mutate(
      { alunoId: id, turmaId: idTurma },
      {
        onError(error) {
          alert(`Não foi possível remover aluno da matrícula, erro: ${error}`);
        },
        onSuccess() {
          alert("Aluno removido com sucesso!");
        },
      }
    );
  }

  return (
    <div className="w-full h-screen size-500 rounded-none bg-radial-[at_50%_75%] from-sky-400 via-blue-500 to-slate-950 to-90%size-500 rounded-none bg-radial-[at_25%_25%] from sky-400 via-blue-500 to-slate-950 to-75% text-indigo-500 flex flex-col items-center overflow-auto gap-5">
      <Header/>
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
      <h3 className="text-indigo-50 text-[30px] ">Bem-vindo, {data?.nome}!</h3>

      <div className=" w-full flex justify-center gap-20 flex flex-row items-center overflow-auto gap-5">
        <div className="flex flex-col">
        <h4 className="text-indigo-50 text-[30px]">Turmas Disponíveis</h4>
        <ul>
          {turmas?.map((turma) => (
            <li key={turma.id} className="text-indigo-50 text-[20px] list-disc">
              {`${turma.disciplina} - ${turma.professor} (${turma.turno})`}
              <ButtonSec onClick={() => handleMatricula(turma.id)}>
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
          {matriculas?.map(({ turma }) => {
            return turma ? (
              <li className="text-indigo-50 text-[20px] list-decimal"key={turma.id}>
                {turma.disciplina} - {turma.professor} ({turma.turno})
                <ButtonSec onClick={() => handleRemoverMatricula(turma.id)}>
                  Remover
                </ButtonSec>
              </li>
            ) : null;
          })}
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
