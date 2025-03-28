import { restClient } from '@/utils/AxiosClient';
import {  } from '@/api/loginApi'

export interface TurmasProps {
  "id": number;
  "professor": string;
  "disciplina": string;
  "dia": string;
  "turno": number;
}

export const classesApi = {
  getTurmas: async () => {
    const { data } = await restClient.get('/classes');
    return data as TurmasProps[];
  },
}