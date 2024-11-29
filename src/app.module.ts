import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfessorModule } from './professor/professor.module';
import { LoggerModule } from './server/infrastructure/logger/logger.module';
import { ScyllaDbModule } from './server/infrastructure/scylladb/scylladb.client';

@Module({
  imports: [ScyllaDbModule, LoggerModule, ProfessorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
