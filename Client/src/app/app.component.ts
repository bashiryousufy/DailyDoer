import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './components/common/dialog/dialog.component';
import { TodoComponent } from './components/todo/todo.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent implements OnInit {
  title = 'DailyDoer';
  public isLogged: boolean = false;

  constructor(private router: Router, public dialog: MatDialog, private activatedRoute: ActivatedRoute) { }

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
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { type: "todo" },
    })
      .afterClosed()
      .subscribe((shouldReload: boolean) => {
        dialogRef.unsubscribe();
        //reload the page to get the latest todos 
        if (shouldReload) window.location.reload();
      });

  }

}
