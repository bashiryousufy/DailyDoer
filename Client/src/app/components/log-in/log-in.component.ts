import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "../../services/api.service";
import { Router } from "@angular/router";
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  public submitted = false;
  public loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.email, Validators.required]],
      password: ["", [Validators.required]]
    });
  }

  get formControl() {
    return this.loginForm.controls;
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.spinner.show();
      this.api.login(this.loginForm.value).subscribe((res) => {
        localStorage.setItem("token", res.accessToken);
        localStorage.setItem("userId", res.userData.id);
        this.router.navigate(["todos"]);
        this.spinner.hide();
      });
    }
  }
}
