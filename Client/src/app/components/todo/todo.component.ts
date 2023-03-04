import { Component, ViewChild} from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../common/dialog/dialog.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  public todos: Todo[] = [];

  constructor(private api: ApiService, public dialog: MatDialog){ }

  ngOnInit() {
    this.getTodos();
  }

  getTodos() {
    this.api.getTodos().subscribe((data: Todo[]) => {
      // sort the todo by not done on top
      this.todos = data.sort((a: any,b: any) => a.isDone - b.isDone );
    });
  }

  openAddTodoDialog(): void {
    
    //open todo dialog 
    this.dialog.open(DialogComponent, {
      data: {type: "todo"},
    });

    //refetch the data to show the latest todo
    this.dialog.afterAllClosed.subscribe(result => {
      this.getTodos();
    });

  }

  updateTodo(event: any): void {

    let todo: Todo = event.options[0]._value;

    //change todo status
    todo = {...todo, isDone: !todo.isDone}

    this.api.updateTodo(todo, todo.id!).subscribe(res => {
      console.log(res)
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
