import { Component } from '@angular/core';
import { TodoService } from '../services/todoservice.service';
import { Todo } from '../models/todo.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {
  AllTodos: Todo[] = []
  todo = {
    title: '',
    content: '',
    done: false
  };
  post = true;
  editid = ""
  constructor(private todoservice: TodoService) { }

  ngOnInit() {
    this.getAllTodos();

    // Auto-refresh every 10 seconds
    // setInterval(() => {
    //   this.getAllTodos();
    // }, 3000);
  }

  getAllTodos() {
    this.todoservice.getTodos().subscribe(res => {
      this.AllTodos = res;
      console.log(res);

    })
  }

  posttodo() {
    this.todoservice.createTodo(this.todo).subscribe({
      next: (res) => {
        console.log('Created:', res);
        this.getAllTodos();
      },
      error: (err) => {
        console.error('POST error:', err);
      }
    });
  }
 changetoedit(id: string) {
    this.post = false;
    console.log("clicked");
    this.editid = id;
  }

  updatetodo() {
    console.log("updating");
    
     this.todoservice.updateTodo(this.editid,this.todo).subscribe({
      next: (res) => {
        console.log('updated:', res);
        this.getAllTodos();
      },
      error: (err) => {
        console.error('POST error:', err);
      }
     });
     this.editid = "";
     this.post= true;
  }

  deletetodo(id : string) {
    console.log("deleteing");
    this.todoservice.deletetodo(id).subscribe({
      next: (res) => {
        console.log('deleted:', res);
        this.getAllTodos();
      },
      error: (err) => {
        console.error('POST error:', err);
      }
     });
  }

  done(id:string, tododone: boolean) {
    console.log("done");
    
     this.todoservice.updateTodo(id,{done:!tododone}).subscribe({
      next: (res) => {
        console.log('done:', res);
        this.getAllTodos();
      },
      error: (err) => {
        console.error('POST error:', err);
      }
     });
     this.editid = "";
     this.post= true;

  }


}
