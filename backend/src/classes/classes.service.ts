import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ClassesService {
  constructor(private readonly dbService: DatabaseService) {}

  async create(createClassDto: Prisma.TurmaCreateInput) {
    try {
      const result = await this.dbService.turma.create({
        data: createClassDto,
      });
      return result;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(`Turma com o id já existente.`);
        }
      }

      throw error;
    }
  }

  async findAll() {
    const result = await this.dbService.turma.findMany({});
    return result;
  }

  async findOne(id: number) {
    const result = await this.dbService.turma.findUnique({ where: { id } });
    return result;
  }

  async update(id: number, updateClassDto: Prisma.TurmaUpdateInput) {
    try {
      const result = await this.dbService.turma.update({
        where: { id },
        data: updateClassDto,
      });
      return result;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Turma com id ${id} não encontrada.`);
        }

        if (error.code === 'P2002') {
          throw new ConflictException(`Já existe uma turma com o mesmo id.`);
        }
      }

      throw error;
    }
  }

  async remove(id: number) {
    try {
      const result = await this.dbService.turma.delete({ where: { id } });
      return result;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Turma com id ${id} não encontrada.`);
      }
      throw error;
    }
  }
}
