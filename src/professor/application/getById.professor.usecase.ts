import { Inject, Injectable } from '@nestjs/common';
import { Professor } from '../domain/professor.model';
import { GetByIdProfessorUseCase } from './usecases.interfaces';
import { ProfessorRepository } from '../domain/professor.repository';
import pino from 'pino';

@Injectable()
export class DefaultGetByIdProfessorUseCase implements GetByIdProfessorUseCase {
  constructor(
    @Inject(ProfessorRepository)
    private readonly repository: ProfessorRepository,
    @Inject('LOGGER') private readonly logger: pino.Logger,
  ) {}

  async do(id: string): Promise<Professor> {
    const profesor = await this.repository.getById(id);
    this.logger.info(
      {
        id: id,
      },
      'profesor founded',
    );
    return profesor;
  }
}
