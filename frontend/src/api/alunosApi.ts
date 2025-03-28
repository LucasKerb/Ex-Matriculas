import { restClient } from '@/utils/AxiosClient';
import { AlunoProps } from '@/api/loginApi'

export const alunosApi = {
  getUnique: async (id: number) => {
    const { data } = await restClient.get(`/students/${id}`);
    return data as AlunoProps;
  },
}