import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.setGlobalPrefix('api'); // all routes go under /api

  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: false,
  });

  await app.listen(3001, '0.0.0.0');
  console.log(`API is running on http://localhost:3001/api`);
}
bootstrap();
