import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ILoggerService, LOGGER_SERVICE } from '@src/modules/logger/interfaces';
import { ICommonService } from './common-service.interface';

@Injectable()
export class CommonService implements ICommonService {
  constructor(@Inject(LOGGER_SERVICE) private readonly logger: ILoggerService) {}

  public async throwInternalError<T>(promise: Promise<T>): Promise<T> {
    try {
      return await promise;
    } catch (error) {
      this.logger.error(error, null, CommonService.name);
      throw new InternalServerErrorException(error);
    }
  }
}
