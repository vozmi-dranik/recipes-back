import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import * as process from 'node:process';


const corsOptions: CorsOptions = {
  origin: ['http://localhost:4200', process.env.API_URL, process.env.APP_URL],
};

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  app.enableCors(corsOptions);

  await app.listen(3000, '0.0.0.0');
}

bootstrap();
