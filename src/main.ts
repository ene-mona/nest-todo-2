import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ReflectionService } from '@grpc/reflection';

async function bootstrap() {
  const PORT = process.env.PORT ?? 3000;  
  //const GRPC_PORT = process.env.GPRC_PORT ?? 50052  //
  const GRPC_PORT = PORT
 
  const app = await NestFactory.create(AppModule);
  app.enableCors(); 
  console.log(`✅ REST API is running on http://0.0.0.0:${PORT}`);

  app.connectMicroservice<MicroserviceOptions>( {
    transport: Transport.GRPC,
    options: {
      onLoadPackageDefinition: (pkg, server) => {
        new ReflectionService(pkg).addToServer(server);
      },
      package: 'todo',
      protoPath: join(__dirname, '../../proto/todo.proto'),
      url: `dns:///0.0.0.0:${GRPC_PORT}`,  
    },
  });

  await app.startAllMicroservices();
  await app.listen(PORT);

  console.log(`✅ gRPC Service is running on the same port: ${GRPC_PORT}`);
}

bootstrap();
