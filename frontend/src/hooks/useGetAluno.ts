import { useQuery } from '@tanstack/react-query';
import { alunosApi } from '@/api/alunosApi';

export function useGetAluno(id: number) {
  return useQuery({
    queryFn: () => alunosApi.getUnique(id),
    queryKey: ["useGetAluno"],
  });
}
