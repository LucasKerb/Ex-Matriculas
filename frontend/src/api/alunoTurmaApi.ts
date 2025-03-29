import { restClient } from "@/utils/AxiosClient";
import { handleTurno } from "./classesApi";

interface AlunoTurmaProps {
  alunoId: number;
  turmaId: number;
  turma: {
    id: number;
    professor: string;
    disciplina: string;
    dia: string;
    turno: number;
  };
}

export type Turno = 1 | 2 | 3;

export interface Aluno {
  id: number;
  nome: string;
}

export interface Turma {
  id: number;
  professor: string;
  disciplina: string;
  dia: string;
  turno: Turno;
}

export interface Matricula {
  alunoId: number;
  turmaId: number;
  aluno: Aluno;
  turma: Turma;
}

export const alunoTurmasApi = {
  getTurmasAluno: async (alunoId?: number) => {
    const { data } = await restClient.get(`/enrollments/student/${alunoId}`);
    const result = data as AlunoTurmaProps[];

    return result.map(({ turma: { turno, ...rest }, alunoId, turmaId }) => ({
      alunoId,
      turmaId,
      turma: {
        turno: handleTurno(turno),
        ...rest,
      },
    }));
  },

  removeAlunoTurma: async ({
    alunoId,
    turmaId,
  }: {
    alunoId: number;
    turmaId: number;
  }) => {
    const { data } = await restClient.delete(
      `/enrollments/${alunoId}/${turmaId}`
    );
    return data;
  },

  addAlunoInTurma: async ({
    alunoId,
    turmaId,
  }: {
    alunoId: number;
    turmaId: number;
  }) => {
    const { data } = await restClient.post(
      `/enrollments/${alunoId}/${turmaId}`
    );
    return data;
  },
};
