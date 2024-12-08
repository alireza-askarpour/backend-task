import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { config } from '@src/config/index.config';
import { validationSchema } from '@src/config/schema/config.schema';
import { LoggerModule } from '../logger/logger.module';
import { Database } from '@src/config/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      validationSchema,
    }),
    LoggerModule,
    Database,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
