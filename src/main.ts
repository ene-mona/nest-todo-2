import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {MicroserviceOptions, Transport} from '@nestjs/microservices'
import { join } from 'path';

async function bootstrap() {
  const GRPC_PORT = process.env.GRPC_PORT ?? 50052;

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: 'todo',
      protoPath: join(__dirname, '../../proto/todo.proto'),
      url: `0.0.0.0:${GRPC_PORT}`, // mine
    }
  });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));

  await app.listen();
  console.log('gRPC Todo Microservice is running...on 50052');
}
bootstrap();
