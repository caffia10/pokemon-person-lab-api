import { Controller, Get, Inject, Param } from '@nestjs/common';
import { GetByIdProfessorUseCase } from '../application/usecases.interfaces';
import pino from 'pino';
import { ProfessorResponse } from './professor.shared.response';

@Controller('professors/get-by-id')
export class GetByIdProfessorController {
  constructor(
    @Inject(GetByIdProfessorUseCase)
    private readonly getByIdProfessorUseCase: GetByIdProfessorUseCase,
    @Inject('LOGGER') private readonly logger: pino.Logger,
  ) {}

  @Get(':id')
  async handle(@Param('id') id: string): Promise<ProfessorResponse> {
    const professor = await this.getByIdProfessorUseCase.do(id);
    this.logger.info({ id }, 'professor retrieved');
    return professor;
  }
}
