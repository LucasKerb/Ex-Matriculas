import { useQuery } from '@tanstack/react-query';
import { classesApi } from '@/api/classesApi';

export function useGetTurmas() {
  return useQuery({
    queryFn: classesApi.getTurmas,
    queryKey: ["useGetTurmas"],
  });
}
