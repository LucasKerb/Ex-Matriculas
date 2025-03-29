import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class StudentsService {
  constructor(private readonly dbService: DatabaseService) {}

  async create(createStudentDto: Prisma.AlunoCreateInput) {
    try {
      const result = await this.dbService.aluno.create({
        data: createStudentDto,
      });
      return result;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(`Aluno com o id já existente.`);
        }
      }

      throw error;
    }
  }

  async findAll() {
    const result = await this.dbService.aluno.findMany({});
    return result;
  }

  async findOne(id: number) {
    const result = await this.dbService.aluno.findUnique({ where: { id } });
    return result;
  }

  async update(id: number, updateStudentDto: Prisma.AlunoUpdateInput) {
    try {
      const result = await this.dbService.aluno.update({
        where: { id },
        data: updateStudentDto,
      });
      return result;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Aluno com id ${id} não encontrado.`);
        }

        if (error.code === 'P2002') {
          throw new ConflictException(`Já existe um aluno com o mesmo id`);
        }
      }

      throw error;
    }
  }

  async remove(id: number) {
    const result = this.dbService.aluno.delete({ where: { id } });
    return result;
  }

  async login(id: number) {
    const aluno = await this.dbService.aluno.findUnique({ where: { id } });

    if (!aluno) {
      throw new NotFoundException(`Aluno com id ${id} não encontrado.`);
    }

    return aluno;
  }
}
