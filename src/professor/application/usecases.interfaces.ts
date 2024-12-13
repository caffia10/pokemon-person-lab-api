import { CreateProfessorDto, Professor } from '../domain/professor.model';

export interface CreateProfessorUseCase {
  do(professor: CreateProfessorDto): Promise<void>;
}

export interface GetByIdProfessorUseCase {
  do(id: string): Promise<Professor>;
}

export interface GetProfessorListUseCase {
  do(): Promise<Professor[]>;
}

export const CreateProfessorUseCase = Symbol('CreateProfessorUseCase');
export const GetByIdProfessorUseCase = Symbol('GetByIdProfessorUseCase');
export const GetProfessorListUseCase = Symbol('GetProfessorListUseCase');
