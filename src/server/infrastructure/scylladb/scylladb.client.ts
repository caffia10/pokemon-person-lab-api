import { Global, Module } from '@nestjs/common';
import { ScyllaDbService } from './scylladb.service';

@Global()
@Module({
  providers: [ScyllaDbService],
  exports: [ScyllaDbService],
})
export class ScyllaDbModule {}
