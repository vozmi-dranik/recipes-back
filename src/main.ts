import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';


const corsOptions: CorsOptions = {
  origin: ['http://localhost:4200', 'http://localhost:3000'],
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
