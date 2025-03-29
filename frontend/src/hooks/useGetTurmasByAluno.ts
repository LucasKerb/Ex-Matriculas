import { alunoTurmasApi } from "@/api/alunoTurmaApi";
import { useQuery } from "@tanstack/react-query";

export function useGetTurmasByAluno(alunoId: number) {
  return useQuery({
    queryFn: () => alunoTurmasApi.getTurmasAluno(alunoId),
    queryKey: ["useGetTurmasByAluno", alunoId],
  });
}
