import { Component, ViewChild} from '@angular/core';
import { ApiService } from '../../api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  displayedColumns: string[] = ['id', 'title', 'description', 'isDone', 'userId'];
  todos!: MatTableDataSource<Todo>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private api: ApiService){ }

  ngOnInit() {
    this.api.getTodos().subscribe((data: Todo[]) => {
      this.todos = new MatTableDataSource<Todo>(data);
      this.todos.paginator = this.paginator;
    });
  }

}

export interface Todo {
  id: String,
  title: String,
  description: String,
  isDone: boolean,
  userId?: String,
}
