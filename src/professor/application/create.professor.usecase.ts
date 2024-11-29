import { Inject, Injectable } from '@nestjs/common';
import { Professor } from '../domain/professor.model';
import { CreateProfessorUseCase } from './usecases.interfaces';
import { ProfessorRepository } from '../domain/professor.repository';
import pino from 'pino';

@Injectable()
export class DefaultCreateProfessorUseCase implements CreateProfessorUseCase {
  constructor(
    @Inject(ProfessorRepository)
    private readonly repository: ProfessorRepository,
    @Inject('LOGGER') private readonly logger: any,
  ) {}

  do(professor: Professor): void {
    this.repository.create(professor);
    this.logger.info(
      {
        name: professor.name,
        laboratoryDesigned: professor.laboratoryDesigned,
      },
      'profesor created',
    );
  }
}
