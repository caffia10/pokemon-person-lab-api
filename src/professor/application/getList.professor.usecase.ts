import { Inject, Injectable } from '@nestjs/common';
import { Professor } from '../domain/professor.model';
import { GetProfessorListUseCase } from './usecases.interfaces';
import { ProfessorRepository } from '../domain/professor.repository';
import pino from 'pino';

@Injectable()
export class DefaultGetProfessorListUseCase implements GetProfessorListUseCase {
  constructor(
    @Inject(ProfessorRepository)
    private readonly repository: ProfessorRepository,
    @Inject('LOGGER') private readonly logger: pino.Logger,
  ) {}

  async do(): Promise<Professor[]> {
    const profesorList = await this.repository.getList();
    this.logger.info('profesor list retrieve');
    return profesorList;
  }
}
