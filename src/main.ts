import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from './config/config.service';
import { LoggerService } from './logger/logger.service';
import helmet from 'helmet';

async function swagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('LT Starter')
    .setDescription('Set a description for your project')
    .build();

  options.schemes = ['http', 'https'];
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
}

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  swagger(app);

  app.use(helmet());

  const config = app.get<ConfigService>(ConfigService);
  await app.listenAsync(config.getPort());

  const logger = app.get<LoggerService>(LoggerService);
  logger.info(`server: running on http://localhost:${config.getPort()}`);
  logger.info(`server: using env ${config.getEnv()}`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
