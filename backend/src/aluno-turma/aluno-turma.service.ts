import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class EnrollmentsService {
  constructor(private readonly dbService: DatabaseService) {}

  async enroll(alunoId: number, turmaId: number) {
    try {
      const result = await this.dbService.alunoTurma.create({
        data: { alunoId, turmaId },
      });
      return result;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(
            'O aluno já está matriculado nessa turma.',
          );
        }
        if (error.code === 'P2003') {
          throw new NotFoundException('Aluno ou turma não encontrados.');
        }
      }
      throw error;
    }
  }

  async remove(alunoId: number, turmaId: number) {
    try {
      const result = await this.dbService.alunoTurma.delete({
        where: { alunoId_turmaId: { alunoId, turmaId } },
      });
      return result;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('Matrícula não encontrada.');
      }
      throw error;
    }
  }

  async findAll() {
    return this.dbService.alunoTurma.findMany({
      include: {
        aluno: true,
        turma: true,
      },
    });
  }

  async findByStudent(alunoId: number) {
    return this.dbService.alunoTurma.findMany({
      where: { alunoId },
      include: { turma: true },
    });
  }

  async findByClass(turmaId: number) {
    return this.dbService.alunoTurma.findMany({
      where: { turmaId },
      include: { aluno: true },
    });
  }
}
