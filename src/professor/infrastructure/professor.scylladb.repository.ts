import { Inject, Injectable } from '@nestjs/common';
import { ProfessorRepository } from '../domain/professor.repository';
import { CreateProfessorDto, Professor } from '../domain/professor.model';
import { v4 as uuidv4 } from 'uuid'; // Para generar UUIDs
import pino from 'pino';
import { ScyllaDbService } from 'src/server/infrastructure/scylladb/scylladb.service';

@Injectable()
export class ProfessorScyllaRepository implements ProfessorRepository {
  private readonly listOptions = { fetchSize: 500 };
  private readonly paramsOptions = { prepare: true };
  constructor(
    @Inject() private service: ScyllaDbService,
    @Inject('LOGGER') private readonly logger: pino.Logger,
  ) {}

  async getList(): Promise<Professor[]> {
    const query = 'SELECT * FROM professors';
    const result = await this.service.execute(query, [], this.listOptions);

    if (result.rowLength == 0) {
      this.logger.info('profesor collection empty');
      throw new Error('not found');
    }

    this.logger.info('profesor list retrieved');
    return result.rows.map((professorRow) => ({
      id: professorRow.id,
      name: professorRow.name,
      lastName: professorRow.last_name,
      laboratoryDesigned: professorRow.laboratory_designed,
    }));
  }

  async create(dto: CreateProfessorDto): Promise<void> {
    const professor: Professor = {
      id: uuidv4(),
      ...dto,
    };
    const query =
      'INSERT INTO human_space.professors(id, name, last_name, laboratory_designed) VALUES  (?, ?, ?, ?)';
    // verificar si puede usar el objecto o tengo que pasar un array por props
    await this.service.execute(query, professor, this.paramsOptions);
    this.logger.info(
      {
        name: professor.name,
        laboratoryDesigned: professor.laboratoryDesigned,
      },
      'profesor created',
    );
  }

  async getById(id: string): Promise<Professor> {
    const query = 'SELECT * FROM professors WHERE id = ?';
    const result = await this.service.execute(query, [id], this.paramsOptions);

    if (result.rowLength == 0) {
      this.logger.info({ id }, 'profesor not found');
      throw new Error('not found');
    }

    this.logger.info({ id }, 'profesor found');
    const professorRow = result.first();
    return {
      id: professorRow.id,
      name: professorRow.name,
      lastName: professorRow.last_name,
      laboratoryDesigned: professorRow.laboratory_designed,
    };
  }
}
