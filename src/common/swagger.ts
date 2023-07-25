import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import * as fs from 'fs';
import * as yaml from 'js-yaml';

const apiSpec = yaml.load(fs.readFileSync('./doc/api.yaml', 'utf8'));

export function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle(apiSpec.info.title)
    .setDescription(apiSpec.info.description)
    .setVersion(apiSpec.info.version)
    .build();

  const document = SwaggerModule.createDocument(app, options, apiSpec);
  SwaggerModule.setup('api', app, document);
}
