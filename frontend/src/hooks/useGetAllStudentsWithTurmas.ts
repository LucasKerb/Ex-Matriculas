import { alunosApi } from "@/api/alunosApi";
import { useQuery } from "@tanstack/react-query";

export function useGetAllStudentsWithTurmas() {
  return useQuery({
    queryFn: () => alunosApi.getAlunosAllWithClasses(),
    queryKey: ["useGetAllStudentsWithTurmas"],
  });
}
