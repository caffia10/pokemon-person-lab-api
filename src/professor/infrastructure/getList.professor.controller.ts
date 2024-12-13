import { Controller, Inject, Post } from '@nestjs/common';
import { GetProfessorListUseCase } from '../application/usecases.interfaces';
import pino from 'pino';
import { ProfessorResponse } from './professor.shared.response';

@Controller('professors/list')
export class GetListProfessorController {
  constructor(
    @Inject(GetProfessorListUseCase)
    private readonly createProfessorUseCase: GetProfessorListUseCase,
    @Inject('LOGGER') private readonly logger: pino.Logger,
  ) {}

  @Post()
  async handle(): Promise<ProfessorResponse[]> {
    const list = await this.createProfessorUseCase.do();
    this.logger.info('professor list retrieve');
    return list;
  }
}
