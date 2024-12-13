import { Module } from '@nestjs/common';
import { CreateProfessorController } from './infrastructure/create.professor.controller';
import {
  CreateProfessorUseCase,
  GetByIdProfessorUseCase,
  GetProfessorListUseCase,
} from './application/usecases.interfaces';
import { ProfessorRepository } from './domain/professor.repository';
import { DefaultCreateProfessorUseCase } from './application/create.professor.usecase';
import { ProfessorScyllaRepository } from './infrastructure/professor.scylladb.repository';
import { GetByIdProfessorController } from './infrastructure/getById.professor.controller';
import { GetListProfessorController } from './infrastructure/getList.professor.controller';
import { DefaultGetByIdProfessorUseCase } from './application/getById.professor.usecase';
import { DefaultGetProfessorListUseCase } from './application/getList.professor.usecase';

@Module({
  controllers: [
    CreateProfessorController,
    GetByIdProfessorController,
    GetListProfessorController,
  ],
  providers: [
    {
      provide: CreateProfessorUseCase,
      useClass: DefaultCreateProfessorUseCase,
    },
    {
      provide: GetByIdProfessorUseCase,
      useClass: DefaultGetByIdProfessorUseCase,
    },
    {
      provide: GetProfessorListUseCase,
      useClass: DefaultGetProfessorListUseCase,
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
    {
      provide: GetByIdProfessorUseCase,
      useClass: DefaultGetByIdProfessorUseCase,
    },
    {
      provide: GetProfessorListUseCase,
      useClass: DefaultGetProfessorListUseCase,
    },
  ],
})
export class ProfessorModule {}
