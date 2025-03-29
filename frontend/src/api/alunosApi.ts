import { AlunoProps } from "@/api/loginApi";
import { restClient } from "@/utils/AxiosClient";
import { handleTurno } from "./classesApi";

export interface Turma {
  id: number;
  professor: string;
  disciplina: string;
  dia: string;
  turno: number;
}

export interface TurmaDto {
  id: number;
  professor: string;
  disciplina: string;
  dia: string;
  turno: string;
}

export interface AlunoComTurmasDto {
  id: number;
  nome: string;
  turmas: {
    alunoId: number;
    turmaId: number;
    turma: TurmaDto;
  }[];
}

export interface AlunoComTurmas {
  id: number;
  nome: string;
  turmas: {
    alunoId: number;
    turmaId: number;
    turma: Turma;
  }[];
}

export const alunosApi = {
  getUnique: async (id?: number) => {
    const { data } = await restClient.get(`/students/${id}`);
    return data as AlunoProps;
  },

  getAlunosAllWithClasses: async (): Promise<AlunoComTurmasDto[]> => {
    const { data } = await restClient.get("/students/with-classes");
    const alunos = data as AlunoComTurmas[];

    const result: AlunoComTurmasDto[] = alunos.map(({ id, nome, turmas }) => ({
      id,
      nome,
      turmas: turmas.map(({ alunoId, turmaId, turma }) => {
        const { turno, ...rest } = turma;
        return {
          alunoId,
          turmaId,
          turma: {
            ...rest,
            turno: handleTurno(turno),
          },
        };
      }),
    }));

    return result;
  },
};
