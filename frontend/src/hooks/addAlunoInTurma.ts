import { alunoTurmasApi } from "@/api/alunoTurmaApi";
import { useMutation } from "@tanstack/react-query";

interface AddAlunoNaTurmaProps {
  alunoId: number;
  turmaId: number;
}

export function useAddAlunoInTurma() {
  return useMutation({
    mutationFn: ({ alunoId, turmaId }: AddAlunoNaTurmaProps) =>
      alunoTurmasApi.addAlunoInTurma({ alunoId, turmaId }),
  });
}
