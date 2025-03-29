import { classesApi } from "@/api/classesApi";
import { useMutation } from "@tanstack/react-query";

export function useDeleteTurma() {
  return useMutation({
    mutationFn: classesApi.remove,
  });
}
