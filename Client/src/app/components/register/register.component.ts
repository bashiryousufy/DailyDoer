import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  Roles: String[] = ['admin', 'user'];
  public registerForm!: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }


  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ["", [Validators.nullValidator, Validators.required]],
      email: ["", [Validators.email, Validators.required]],
      password: ["", [Validators.required]],
      role: ["", [Validators.required]],
    });
  }

  get formControl() {
    return this.registerForm.controls;
  }

  onRegister(): void {
    if (this.registerForm.valid) {
      this.spinner.show();
      this.api.register(this.registerForm.value).subscribe((res) => {
        this.router.navigate(["login"]);
        this.spinner.hide();
      });
    }
  }
}