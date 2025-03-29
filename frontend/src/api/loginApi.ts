import { restClient } from "@/utils/AxiosClient";

export interface AlunoProps {
  id: number;
  nome: string;
}

export const loginApi = {
  login: async (props: AlunoProps) => {
    const { data } = await restClient.post("/students/login", props);
    return data;
  },

  register: async (props: AlunoProps) => {
    const { data } = await restClient.post("/students", props);
    return data;
  },
};
