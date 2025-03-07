
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "todo";

export interface Empty {
}

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export interface CreateTodoDto {
  title: string;
}

export interface Todos {
  todos: Todo[];
}

export interface UpdateTodoDto {
  id: string;
  title: string;
  completed: boolean;
}

export interface TodoByIdDto {
  id: string;
}

export const TODO_PACKAGE_NAME = "todo";

export interface TodoServiceClient {
  /** Local CRUD */

  createTodo(request: CreateTodoDto): Observable<Todo>;

  getTodos(request: Empty): Observable<Todos>;

  getTodoById(request: TodoByIdDto): Observable<Todo>;

  updateTodoById(request: UpdateTodoDto): Observable<Empty>;

  deleteTodoById(request: TodoByIdDto): Observable<Empty>;

  /** Remote */

  createRemoteTodo(request: CreateTodoDto): Observable<Todo>;

  getRemoteTodos(request: Empty): Observable<Todos>;

  getRemoteTodoById(request: TodoByIdDto): Observable<Todo>;

  updateRemoteTodoById(request: UpdateTodoDto): Observable<Empty>;

  deleteRemoteTodoById(request: TodoByIdDto): Observable<Empty>;
}

export interface TodoServiceController {
  /** Local CRUD */

  createTodo(request: CreateTodoDto): Promise<Todo> | Observable<Todo> | Todo;

  getTodos(request: Empty): Promise<Todos> | Observable<Todos> | Todos;

  getTodoById(request: TodoByIdDto): Promise<Todo> | Observable<Todo> | Todo;

  updateTodoById(request: UpdateTodoDto): Promise<Empty> | Observable<Empty> | Empty;

  deleteTodoById(request: TodoByIdDto): Promise<Empty> | Observable<Empty> | Empty;

  /** Remote */

  createRemoteTodo(request: CreateTodoDto): Promise<Todo> | Observable<Todo> | Todo;

  getRemoteTodos(request: Empty): Promise<Todos> | Observable<Todos> | Todos;

  getRemoteTodoById(request: TodoByIdDto): Promise<Todo> | Observable<Todo> | Todo;

  updateRemoteTodoById(request: UpdateTodoDto): Promise<Empty> | Observable<Empty> | Empty;

  deleteRemoteTodoById(request: TodoByIdDto): Promise<Empty> | Observable<Empty> | Empty;
}

export function TodoServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "createTodo",
      "getTodos",
      "getTodoById",
      "updateTodoById",
      "deleteTodoById",
      "createRemoteTodo",
      "getRemoteTodos",
      "getRemoteTodoById",
      "updateRemoteTodoById",
      "deleteRemoteTodoById",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("TodoService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("TodoService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const TODO_SERVICE_NAME = "TodoService";
