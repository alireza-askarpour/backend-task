import { bold } from 'chalk';
import { ConfigService } from '@nestjs/config';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from '@src/modules/app/app.module';
import { SwaggerConfig } from '@src/config/swagger.config';
import { LOGGER_SERVICE } from '@src/modules/logger/interfaces';
import { AllExceptionsFilter } from '@src/config/exceptions/all-exceptions.filter';
import { NotFoundExceptionFilter } from '@src/config/exceptions/not_found_exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<INestApplication>(AppModule);

  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api/v1');
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const port: number = configService.get<number>('app_port');
  const mode: string = configService.get<string>('app_mode');
  const docPath: string = configService.get<string>('doc_path');

  SwaggerConfig(app, docPath);

  const httpAdapterHost = app.get(HttpAdapterHost);
  const logger = app.get(LOGGER_SERVICE);
  app.useGlobalFilters(new NotFoundExceptionFilter(logger));
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));

  await app.listen(port, () => {
    const runningMode = `Server running in ${bold(mode)} mode`;
    const runningOnPort = `on port ${bold(port)}`;
    const runningSince = `[since ${new Date().toISOString()}]`;
    console.log(`🏁 —> ${runningMode} ${runningOnPort} ${runningSince}`);
  });
}
bootstrap();
