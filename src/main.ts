import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const PORT = process.env.PORT ?? 3000;  // ✅ Railway assigns a dynamic port
  const GRPC_PORT = process.env.GPRC_PORT ?? 50052  // ✅ Use the same port for gRPC

  // ✅ Start the REST API (Railway needs an HTTP service to detect it as "running")
  const app = await NestFactory.create(AppModule);
  app.enableCors();  // Enable CORS if you need API access from a frontend
  await app.listen(PORT);
  console.log(`✅ REST API is running on http://0.0.0.0:${PORT}`);

  // ✅ Start the gRPC Service on the SAME PORT (Multiplexing)
  const grpcApp = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: 'todo',
      protoPath: join(__dirname, '../../proto/todo.proto'),
      url: `0.0.0.0:${GRPC_PORT}`,  // ✅ Use the same port as the REST API
    },
  });

  await grpcApp.listen();
  console.log(`✅ gRPC Service is running on the same port: ${GRPC_PORT}`);
}

bootstrap();
