import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { SWAGGER_CONFIG } from './swagger.config';

export function createDocument(app: INestApplication): OpenAPIObject {
  const builder = new DocumentBuilder()
    .setTitle(SWAGGER_CONFIG.title)
    .setDescription(SWAGGER_CONFIG.description)
    .addServer(`${process.env.URL_STORAGE}/futbox`)
    .setVersion(SWAGGER_CONFIG.version);
  for (const tag of SWAGGER_CONFIG.tags) {
    builder.addTag(tag);
  }

  if (process.env.NODE_ENV === 'develop') {
    builder.addServer('http://localhost:3000');
  }

  const options = builder.build();
  return SwaggerModule.createDocument(app, options);
}
