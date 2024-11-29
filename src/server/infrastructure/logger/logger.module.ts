import { Global, Module } from '@nestjs/common';
import { pino } from 'pino';

const type = {
  provide: 'LOGGER',
  useValue: pino({
    level: process.env.LOG_LEVEL || 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: process.env.ENVIRONMENT == 'local',
      },
    },
  }),
};

@Global()
@Module({
  providers: [type],
  exports: [type],
})
export class LoggerModule {}
