import { CreateProfessorDto } from '../domain/professor.model';

export interface CreateProfessorUseCase {
  do(professor: CreateProfessorDto): void;
}

export const CreateProfessorUseCase = Symbol('CreateProfessorUseCase');
