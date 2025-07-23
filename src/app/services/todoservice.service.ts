import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';
import { CreateTodoDto } from '../dto/createTodo.dto';
import { UpdateTodoDto } from '../dto/updateTodo.dto';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http : HttpClient) { }
  private apiUrl = "https://todo-app-angular-nest-mongodb.onrender.com/todo"

  getTodos() : Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  createTodo(todo : CreateTodoDto) : Observable<CreateTodoDto> {
    let header = new HttpHeaders()
    .set("Content-Type" , "application/json");
    return this.http.post<Todo>(this.apiUrl, todo, {headers : header})
  }
  
  updateTodo(id:string , todo: UpdateTodoDto) : Observable<Todo> {
    let header = new HttpHeaders()
    .set("Content-Type" , "application/json");
    console.log(this.apiUrl+'/'+id);
    
    return this.http.patch<Todo>(`${this.apiUrl}/${id}`, todo, {headers: header});
  }

  deletetodo(id:string) : Observable<Todo> {
    let header = new HttpHeaders()
    .set("Content-Type" , "application/json");
    console.log(this.apiUrl+'/'+id);
    return this.http.delete<Todo>(`${this.apiUrl}/${id}`);
  }

}
