import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateProfessorUseCase } from '../application/usecases.interfaces';
import pino from 'pino';

interface CreateProfessorRequest {
  name: string;
  lastName: string;
  laboratoryDesigned: string;
}

@Controller('professors/create')
export class CreateProfessorController {
  constructor(
    @Inject(CreateProfessorUseCase)
    private readonly createProfessorUseCase: CreateProfessorUseCase,
    @Inject('LOGGER') private readonly logger: pino.Logger,
  ) {}

  @Post()
  async handle(
    @Body() createProfessorRequest: CreateProfessorRequest,
  ): Promise<void> {
    this.createProfessorUseCase.do(createProfessorRequest);
    this.logger.info('professor created');
  }
}
