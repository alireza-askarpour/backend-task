import { Global, Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { LoggerModule } from '@src/modules/logger/logger.module';

export const COMMON_SERVICE = Symbol('ICommonService');

@Global()
@Module({
  imports: [LoggerModule],
  providers: [
    {
      provide: COMMON_SERVICE,
      useClass: CommonService,
    },
  ],
  exports: [COMMON_SERVICE],
})
export class CommonModule {}
