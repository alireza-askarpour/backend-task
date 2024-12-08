import { BaseExceptionFilter } from '@nestjs/core';
import { Catch, NotFoundException, ArgumentsHost, Inject } from '@nestjs/common';
import { ILoggerService, LOGGER_SERVICE } from '@src/modules/logger/interfaces';

@Catch(NotFoundException)
export class NotFoundExceptionFilter extends BaseExceptionFilter {
  constructor(@Inject(LOGGER_SERVICE) private readonly logger: ILoggerService) {
    super();
  }

  catch(exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const message = `404 Error: ${exception.message}`;

    // Log the 404 error message
    this.logger.error(message, undefined, 'NotFoundExceptionFilter');

    response.status(404).json({
      statusCode: 404,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: 'Resource not found',
    });
  }
}
