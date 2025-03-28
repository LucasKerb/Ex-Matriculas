import { alunosApi } from "@/api/alunosApi";
import { useQuery } from "@tanstack/react-query";

export function useGetAluno(id?: number) {
  return useQuery({
    queryFn: () => alunosApi.getUnique(id),
    queryKey: ["useGetAluno", id],
    enabled: !!id,
  });
}
