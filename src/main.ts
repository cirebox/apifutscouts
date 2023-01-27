import { Logger, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import { config } from 'dotenv';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { createDocument } from './swagger/swagger.create-document';
import { customOptions } from './swagger/swagger.custom-options';
config();

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create<NestExpressApplication | any>(AppModule);

  SwaggerModule.setup('api/v1', app, createDocument(app), customOptions);

  app.use(helmet());
  ///app.enableCors();
  app.disable('x-powered-by');
  app.use(compression());

  app.enableVersioning({
    type: VersioningType.HEADER,
    header: 'version',
  });

  app.startAllMicroservices();

  await app.listen(process.env.PORT || 3000, () => {
    logger.verbose(`Application is running on: ${process.env.PORT || 3000} º`);
  });
}

bootstrap();
