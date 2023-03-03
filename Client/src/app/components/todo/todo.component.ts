import { Component, ViewChild} from '@angular/core';
import { ApiService } from '../../api.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../common/dialog/dialog.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  public todos: Todo[] = [];
  private newTodo?: Todo;
  constructor(private api: ApiService, public dialog: MatDialog){ }

  ngOnInit() {
    this.api.getTodos().subscribe((data: Todo[]) => {
      this.todos = data;
    });
  }

  openAddTodoDialog(): void {
    this.dialog.open(DialogComponent, {
      data: {type: "todo"},
    });
  }

}

export interface Todo {
  id: String,
  title: String,
  description: String,
  isDone: boolean,
  userId?: String,
  createdAt: String,
}
