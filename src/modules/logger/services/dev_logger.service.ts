import { Injectable } from '@nestjs/common';
import { logger } from '../winston.config';
import { ConfigService } from '@nestjs/config';
import { IDevLoggerService } from '../interfaces/dev-logger-service.interface';

@Injectable()
export class DevLoggerService implements IDevLoggerService {
  private isDevelopment: boolean;

  constructor(private readonly _configService: ConfigService) {
    this.isDevelopment = this._configService.get<boolean>('is_development');
  }

  log(message: string, context?: string) {
    if (this.isDevelopment) logger.info(message, { context });
  }

  error(message: string, trace: string, context?: string) {
    if (this.isDevelopment) logger.error(message, { context, trace });
  }

  warn(message: string, context?: string) {
    if (this.isDevelopment) logger.warn(message, { context });
  }

  debug(message: string, context?: string) {
    if (this.isDevelopment) logger.debug(message, { context });
  }
}
