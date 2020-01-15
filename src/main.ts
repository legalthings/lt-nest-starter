import { LoggerService } from './app/common/modules/logger/logger.service';
import { ConfigService } from './app/common/modules/config/config.service';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { INestApplication } from '@nestjs/common';
import cors from 'cors';
import helmet from 'helmet';
import cookie from 'cookie-parser';
import bodyParser from 'body-parser';
import cloneBuffer from 'clone-buffer';
import { Request } from 'express';

declare const module: any;

async function swagger(app: INestApplication, config: ConfigService) {
  const options = new DocumentBuilder()
    .setTitle('LT Starter')
    .setDescription('LT starter project')
    .addBearerAuth()
    .build();

  config.isSSLEnabled() ? options.schemes = ['https'] : options.schemes = ['http', 'https'];

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { bodyParser: false });
  const config = app.get<ConfigService>(ConfigService);

  await swagger(app, config);

  const dist = await config.getDist();
  if (dist) {
    app.useStaticAssets(dist, { index: false });
  }
  app.use(cors(await config.getCors()));
  app.use(cookie());
  app.use(helmet());
  app.use(bodyParser.json({
    verify: (req: Request, res, buf) => {
      (req as any).rawBody = Buffer.isBuffer(buf) && config.isRawPath(req.path) && cloneBuffer(buf);
      return true;
    },
  }));

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
