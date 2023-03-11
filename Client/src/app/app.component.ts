import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent implements OnInit {
  title = 'DailyDoer';
  public isLogged: boolean = false;

  constructor(private router: Router) { }

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



}
