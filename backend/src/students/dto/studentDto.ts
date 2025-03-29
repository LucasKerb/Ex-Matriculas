import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class CreateStudentDto {
  @IsInt({ message: 'O ID deve ser um número inteiro' })
  @Min(1, { message: 'O ID deve ser maior que 0' })
  id: number;

  @IsNotEmpty({ message: 'O nome é obrigatório' })
  nome: string;
}
