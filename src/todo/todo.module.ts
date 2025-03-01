import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'TODO_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'todo',
          protoPath: join(__dirname, '../../../proto/todo.proto'),
          url: 'localhost:50051', // CHANGE THIS TO YOUR COLLEAGUE'S SERVER
        //  url: process.env.GRPC_TODO_SERVICE_URL ?? 'nest-grpc.railway.internal:50051',

          
        },
      },
    ]),
    TypeOrmModule.forFeature([Todo]),
],
  providers: [TodoService],
  controllers: [TodoController]
})
export class TodoModule {}
