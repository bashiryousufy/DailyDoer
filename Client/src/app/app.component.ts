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
  public isAdmin: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {

    if (localStorage.getItem("token")) {

      this.isLogged = true;

      if (localStorage.getItem('role') === 'admin') this.isAdmin = true;

      this.router.navigate(["todos"]);

    }

  }

  logout() {

    this.isLogged = false;
    this.isAdmin = false;

    if (localStorage.getItem("token")) {

      localStorage.removeItem("token");

      localStorage.removeItem("userId");

      localStorage.removeItem("role");

      this.router.navigate(["login"]);

    }

  }



}
