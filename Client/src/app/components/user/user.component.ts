import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  // displayedColumns: string[] = ['id', 'title', 'description', 'isDone', 'createdAt', 'userId'];
  // todos!: MatTableDataSource<Todo>;

  // @ViewChild(MatPaginator) paginator!: MatPaginator;

  // constructor(private api: ApiService){ }

  // ngOnInit() {
  //   this.api.getTodos().subscribe((data: Todo[]) => {
  //     this.todos = new MatTableDataSource<Todo>(data);
  //     this.todos.paginator = this.paginator;
  //   });
  // }
}
