import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import * as grpc from '@grpc/grpc-js';

@Module({
  imports: [
    ClientsModule.register([
      {
      
        name: 'TODO_SERVICE',
        transport: Transport.GRPC,
        options: {

          package: 'todo',
          protoPath: join(__dirname, '../../../proto/todo.proto'),
          //url: 'localhost:8080', // CHANGE THIS TO YOUR COLLEAGUE'S SERVER
          url:'dns:///app1-123353802946.us-central1.run.app:443',
          credentials: grpc.credentials.createSsl(), 
        },
      },
    ]),
    TypeOrmModule.forFeature([Todo]),
],
  providers: [TodoService],
  controllers: [TodoController]
})
export class TodoModule {}
