import { Global, Module } from '@nestjs/common';
import { LoggerService } from './services/logger.service';
import { DevLoggerService } from './services/dev_logger.service';
import { DEV_LOGGER_SERVICE, LOGGER_SERVICE } from './interfaces';

@Global()
@Module({
  providers: [
    {
      provide: LOGGER_SERVICE,
      useClass: LoggerService,
    },
    {
      provide: DEV_LOGGER_SERVICE,
      useClass: DevLoggerService,
    },
  ],
  exports: [LOGGER_SERVICE, DEV_LOGGER_SERVICE],
})
export class LoggerModule {}
