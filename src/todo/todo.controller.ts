import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './entities/todo.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateTodoDto, FindOneParams, UpdateTodoDto } from './dto';
import { GrpcMethod } from '@nestjs/microservices';
import { Empty } from 'proto/todo';

@Controller('todos')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    // Local CRUD Operations
    @GrpcMethod('TodoService', 'CreateTodo')
    createTodo(payload: CreateTodoDto): Promise<Todo> {
        return this.todoService.create(payload.title);
    }

    @GrpcMethod('TodoService', 'GetTodos')
    getTodos(_: Empty): Promise<{ todos: Todo[] }> {
        return this.todoService.findAll();
    }

    @GrpcMethod('TodoService', 'GetTodoById')
    getTodoById(params: FindOneParams): Promise<Todo | null> {
        return this.todoService.findOne(params.id);
    }

    @GrpcMethod('TodoService', 'UpdateTodoById')
    updateTodoById(payload: UpdateTodoDto): Promise<UpdateResult> {
        return this.todoService.updateById(payload.id, { title: payload.title, completed: payload.completed });
    }

    @GrpcMethod('TodoService', 'DeleteTodoById')
    deleteTodoById(params: FindOneParams): Promise<DeleteResult> {
        return this.todoService.deleteById(params.id);
    }

    // Remote CRUD Operations (gRPC calls to the other microservice)
    @Post('create')
    createRemoteTodo(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
        const { title } = createTodoDto;
        return this.todoService.createRemoteTodo(title);
    }

    @Get()
    getRemoteTodos(_: Empty): Promise<{ todos: Todo[] }> {
        return this.todoService.getRemoteTodos();
    }

    @Get(':id')
    getRemoteTodoById(@Param('id') params: FindOneParams): Promise<Todo> {
        return this.todoService.getRemoteTodoById(params.id);
    }

    @Post(':id')
    updateRemoteTodoById(@Param('id') params: FindOneParams, @Body() payload: UpdateTodoDto): Promise<void> {
        return this.todoService.updateRemoteTodoById(params.id, payload.title ?? '', payload.completed);
    }

    @Delete(':id')
    deleteRemoteTodoById(@Param('id') params: FindOneParams): Promise<void> {
        return this.todoService.deleteRemoteTodoById(params.id);
    }
  
}
