import { Module } from '@nestjs/common';
import { ProfessorController } from './infrastructure/professor.controller';
import { CreateProfessorUseCase } from './application/usecases.interfaces';
import { ProfessorRepository } from './domain/professor.repository';
import { DefaultCreateProfessorUseCase } from './application/create.professor.usecase';
import { ProfessorScyllaRepository } from './infrastructure/professor.scylladb.repository';

@Module({
  controllers: [ProfessorController],
  providers: [
    {
      provide: CreateProfessorUseCase,
      useClass: DefaultCreateProfessorUseCase,
    },
    {
      provide: ProfessorRepository,
      useClass: ProfessorScyllaRepository,
    },
  ],
  exports: [
    {
      provide: CreateProfessorUseCase,
      useClass: DefaultCreateProfessorUseCase,
    },
  ],
})
export class ProfessorModule {}
