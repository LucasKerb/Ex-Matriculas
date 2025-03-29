import {} from "@/api/loginApi";
import { restClient } from "@/utils/AxiosClient";

export interface CreateTurmaProps {
  professor: string;
  disciplina: string;
  dia: string;
  turno: number;
}

export interface TurmasProps extends CreateTurmaProps {
  id: number;
}

export interface TurmaDto {
  id?: number;
  professor: string;
  disciplina: string;
  dia: string;
  turno: string;
}

export function handleTurno(turno: number): string {
  switch (turno) {
    case 1:
      return "Manhã";
    case 2:
      return "Tarde";
    case 3:
      return "Noite";
    default:
      return "Desconhecido";
  }
}

export const classesApi = {
  getTurmas: async () => {
    const { data } = await restClient.get("/classes");
    const dataRes = data as TurmasProps[];

    const result: TurmaDto[] = dataRes.map(({ turno, ...rest }) => ({
      turno: handleTurno(turno),
      ...rest,
    }));

    return result;
  },

  createClass: async (props: CreateTurmaProps) => {
    const { data } = await restClient.post("/classes", props);
    return data;
  },

  remove: async ({ id }: { id: number }) => {
    if (!id || isNaN(Number(id))) throw new Error("ID inválido");
    const { data } = await restClient.delete(`/classes/${Number(id)}`);
    return data;
  },
};
