import { alunoTurmasApi } from "@/api/alunoTurmaApi";
import { useMutation } from "@tanstack/react-query";

interface RemoveAlunoTurmaProps {
  alunoId: number;
  turmaId: number;
}

export function useDeleteAlunoOfTurma() {
  return useMutation({
    mutationFn: ({ alunoId, turmaId }: RemoveAlunoTurmaProps) =>
      alunoTurmasApi.removeAlunoTurma({ alunoId, turmaId }),
  });
}
