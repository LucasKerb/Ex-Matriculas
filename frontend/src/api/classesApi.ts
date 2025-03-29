import {} from "@/api/loginApi";
import { restClient } from "@/utils/AxiosClient";

export interface TurmasProps {
  id: number;
  professor: string;
  disciplina: string;
  dia: string;
  turno: number;
}

export function handleTurno(turno: number) {
  if (turno === 1) {
    return "Manhã";
  }
  if (turno === 2) {
    return "Tarde";
  }
  if (turno === 3) {
    return "Noite";
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
};
