import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { EnrollmentsService } from './aluno-turma.service';

@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  // Matricular aluno na turma
  @Post(':alunoId/:turmaId')
  enroll(
    @Param('alunoId', ParseIntPipe) alunoId: number,
    @Param('turmaId', ParseIntPipe) turmaId: number,
  ) {
    return this.enrollmentsService.enroll(alunoId, turmaId);
  }

  // Remover aluno da turma
  @Delete(':alunoId/:turmaId')
  remove(
    @Param('alunoId', ParseIntPipe) alunoId: number,
    @Param('turmaId', ParseIntPipe) turmaId: number,
  ) {
    return this.enrollmentsService.remove(alunoId, turmaId);
  }

  // Listar todas as matrículas
  @Get()
  findAll() {
    return this.enrollmentsService.findAll();
  }

  // 	Listar turmas de um aluno
  @Get('student/:alunoId')
  findByStudent(@Param('alunoId', ParseIntPipe) alunoId: number) {
    return this.enrollmentsService.findByStudent(alunoId);
  }

  // 	Listar alunos de uma turma
  @Get('class/:turmaId')
  findByClass(@Param('turmaId', ParseIntPipe) turmaId: number) {
    return this.enrollmentsService.findByClass(turmaId);
  }
}
