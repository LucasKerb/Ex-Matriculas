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

export function handleTurno(turno: number): string {
  switch (turno) {
    case 1:
      return "Manhã";
    case 2:
      return "Tarde";
    case 3:
      return "Noite";
    default:
      return "Desconhecido"; // garante retorno válido
  }
}

export const classesApi = {
  getTurmas: async () => {
    const { data } = await restClient.get("/classes");
    const result = data as TurmasProps[];

    return result.map(({ turno, ...rest }) => ({
      turno: handleTurno(turno),
      ...rest,
    }));
  },

  createClass: async (props: CreateTurmaProps) => {
    const { data } = await restClient.post("/classes", props);
    return data;
  },
};
