import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import * as process from 'node:process';

const corsOptions: CorsOptions = {
  origin: [process.env.API_URL, RegExp(process.env.APP_URL)],
};

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  console.log(corsOptions);
  app.enableCors(corsOptions);

  await app.listen(3000, '0.0.0.0');
}

bootstrap();
