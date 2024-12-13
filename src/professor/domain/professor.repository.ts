import { CreateProfessorDto, Professor } from './professor.model';

export interface ProfessorRepository {
  create(dto: CreateProfessorDto): Promise<void>;
  getById(id: string): Promise<Professor>;
  getList(): Promise<Professor[]>;
}

export const ProfessorRepository = Symbol('ProfessorRepository');
