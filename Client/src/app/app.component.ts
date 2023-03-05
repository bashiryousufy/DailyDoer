import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './components/common/dialog/dialog.component';
import { TodoComponent } from './components/todo/todo.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'DailyDoer';
  public isLogged: boolean = false;

  @ViewChild(TodoComponent, { static: true }) todoComponent: TodoComponent | undefined;

  constructor(private router: Router, public dialog: MatDialog) { }

  ngOnInit() {

    if (localStorage.getItem("token")) {

      this.isLogged = true;

      this.router.navigate(["todos"]);

    }

  }

  logout() {

    this.isLogged = false;

    if (localStorage.getItem("token")) {

      localStorage.removeItem("token");

      localStorage.removeItem("userId");

      this.router.navigate(["login"]);

    }

  }

  openAddTodoDialog(): void {
    //open todo dialog 
    this.dialog.open(DialogComponent, {
      data: { type: "todo" },
    });

  }

  translateTodo(): void {

  }

}
