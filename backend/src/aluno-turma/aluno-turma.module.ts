import { Module } from '@nestjs/common';
import { EnrollmentsController } from './aluno-turma.controller';
import { EnrollmentsService } from './aluno-turma.service';

@Module({
  controllers: [EnrollmentsController],
  providers: [EnrollmentsService],
})
export class AlunoTurmaModule {}
