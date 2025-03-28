import { AlunoProps } from "@/api/loginApi";
import { restClient } from "@/utils/AxiosClient";

export const alunosApi = {
  getUnique: async (id: number) => {
    const { data } = await restClient.get(`/students/${id}`);
    return data as AlunoProps;
  },
};
