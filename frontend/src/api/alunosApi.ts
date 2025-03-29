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

export interface AlunoComTurmas {
  id: number;
  nome: string;
  turmas: Turma[];
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
  turmas: TurmaDto[];
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
      turmas: turmas.map(({ turno, ...rest }) => ({
        ...rest,
        turno: handleTurno(turno),
      })),
    }));

    return result;
  },

  remove: async ({ id }: { id: number }) => {
    if (!id || isNaN(Number(id))) throw new Error("ID inválido");
    const { data } = await restClient.delete(`/students/${Number(id)}`);
    return data;
  },
};
