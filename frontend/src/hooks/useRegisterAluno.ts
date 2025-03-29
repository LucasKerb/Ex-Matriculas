import { loginApi } from '@/api/loginApi';
import { useMutation } from '@tanstack/react-query';
import { AlunoProps } from '@/api/loginApi';

export function useRegisterAluno() {
  return useMutation<AlunoProps, Error, AlunoProps>({
    mutationFn: loginApi.register,
  });
}