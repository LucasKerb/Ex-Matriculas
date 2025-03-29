import { alunosApi } from "@/api/alunosApi";
import { useMutation } from "@tanstack/react-query";

export function useDeleteAluno() {
  return useMutation({
    mutationFn: alunosApi.remove,
  });
}
