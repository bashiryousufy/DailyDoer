import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DialogComponent } from '../common/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

export interface Todo {
  id?: string,
  title: string,
  description: string,
  isDone: boolean,
  userId?: string,
  createdAt: string,
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})

export class TodoComponent implements OnInit {
  public todos: Todo[] = [];
  public todosTitles: String[] = [];


  constructor(private api: ApiService, public spinner: NgxSpinnerService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getTodos();
  }

  openAddTodoDialog(): void {
    //open todo dialog 
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { type: "add" },
    })
      .afterClosed()
      .subscribe((shouldReload: boolean) => {
        dialogRef.unsubscribe();
        //reload the page to get the latest todos 
        if (shouldReload) this.getTodos();
      });

  }

  viewTodo(todo: Todo): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { type: "update", todo: todo },
    })
      .afterClosed()
      .subscribe((shouldReload: boolean) => {
        dialogRef.unsubscribe();
        //reload the page to get the latest todos 
        if (shouldReload) this.getTodos();
      });
  }

  getTodos(): void {

    this.spinner.show();

    this.api.getTodos().subscribe((data: Todo[]) => {
      // sort the todo by not done on top
      this.todos = data.sort((a: any, b: any) => a.isDone - b.isDone);

      //combine all the titles along with todo id 
      this.todos.map((todo) => {
        this.todosTitles.push(`${todo.id}_${todo.title}`);
      });

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

  translateTodo(event: any): void {

    if (this.todos.length !== 0 && event.value !== 'None') {

      const data = { data: this.todosTitles, target: event.value };

      this.spinner.show();

      this.api.translateTodo(data).subscribe(res => {

        let translatedTodos: Todo[] = [];

        for (const todo of this.todos) {

          for (const resTodo of res.translatedTitle) {

            //match the todoid 
            if (todo.id === resTodo.split("_")[0]) {

              translatedTodos.push(
                { ...todo, title: resTodo.split("_")[1] }
              );

            }

          }

        }

        this.todos = translatedTodos;

        this.spinner.hide();

      });

    }

  }

}


