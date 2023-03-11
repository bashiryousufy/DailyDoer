import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { SingleViewComponentComponent } from '../common/single-view-component/single-view-component.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  displayedColumns: string[] = ['id', 'email', 'name', 'role', 'createdAt'];
  users!: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private api: ApiService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.api.getUsers().subscribe((data: User[]) => {
      this.users = new MatTableDataSource<User>(data);
      this.users.paginator = this.paginator;
      console.log(this.users)
    });
  }

  viewUser(user: User): void {
    this.dialog.open(SingleViewComponentComponent, {
      data: { user: user },
    });
  }
}

export interface User {
  id: string,
  email: string,
  name: string,
  role: boolean,
  createdAt: string,
}
