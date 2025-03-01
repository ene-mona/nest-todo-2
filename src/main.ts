import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const PORT = process.env.PORT ?? 3000;  
  const GRPC_PORT = process.env.GPRC_PORT ?? 50052  

  const app = await NestFactory.create(AppModule);
  app.enableCors(); 
  await app.listen(PORT);
  console.log(`✅ REST API is running on http://0.0.0.0:${PORT}`);

  const grpcApp = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: 'todo',
      protoPath: join(__dirname, '../../proto/todo.proto'),
       url: `0.0.0.0:${GRPC_PORT}`,  
    },
  });

  await grpcApp.listen();
  console.log(`✅ gRPC Service is running on the same port: ${GRPC_PORT}`);
}

bootstrap();
