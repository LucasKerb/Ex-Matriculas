import { Module } from '@nestjs/common';
import { AlunoTurmaModule } from './aluno-turma/aluno-turma.module';
import { ClassesModule } from './classes/classes.module';
import { DatabaseModule } from './database/database.module';
import { StudentsModule } from './students/students.module';

@Module({
  imports: [DatabaseModule, StudentsModule, ClassesModule, AlunoTurmaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
