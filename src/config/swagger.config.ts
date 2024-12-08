import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

export const SwaggerConfig = (app: any, path: string): void => {
  const config = new DocumentBuilder()
    .setTitle('Backend Task - REST APIs')
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        in: 'headers',
        name: 'Authorization',
      },
      'default',
    )
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(path, app, documentFactory);
};
