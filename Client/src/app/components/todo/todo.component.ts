import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})

export class TodoComponent implements OnInit {
  public todos: Todo[] = [];

  constructor(private api: ApiService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getTodos();
  }

  getTodos(): void {

    this.spinner.show();

    this.api.getTodos().subscribe((data: Todo[]) => {
      // sort the todo by not done on top
      this.todos = data.sort((a: any, b: any) => a.isDone - b.isDone);

      this.spinner.hide();

    });

  }

  updateTodo(event: any): void {

    let todo: Todo = event.target.value;

    //change todo status
    todo = { ...todo, isDone: !todo.isDone }

    this.spinner.show();

    this.api.updateTodo(todo, todo.id!).subscribe(res => {
      this.getTodos();
    });

  }

  deleteTodo(event: any): void {

    const todoId = event.target.value;

    this.spinner.show();

    this.api.deleteTodo(todoId).subscribe(res => {

      this.getTodos();

    });

  }

}

export interface Todo {
  id?: String,
  title: String,
  description: String,
  isDone: boolean,
  userId?: String,
  createdAt: String,
}
