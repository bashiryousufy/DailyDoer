import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { of } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let formBuilder: FormBuilder;
  let apiService: jasmine.SpyObj<ApiService>;
  let router: jasmine.SpyObj<Router>;
  let spinner: jasmine.SpyObj<NgxSpinnerService>;

  beforeEach(async () => {
    const apiSpy = jasmine.createSpyObj('ApiService', ['register']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const spinnerSpy = jasmine.createSpyObj('NgxSpinnerService', ['show', 'hide']);
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      providers: [
        { provide: FormBuilder, useValue: formBuilder },
        { provide: ApiService, useValue: apiSpy },
        { provide: Router, useValue: routerSpy },
        { provide: NgxSpinnerService, useValue: spinnerSpy },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize register form', () => {
    expect(component.registerForm).toBeDefined();
  });

  it('should validate name field as required', () => {
    const name = component.registerForm.controls['name'];
    expect(name.valid).toBeFalsy();

    name.setValue('John');
    expect(name.valid).toBeTruthy();
  });

  it('should validate email field as required and valid email', () => {
    const email = component.registerForm.controls['email'];
    expect(email.valid).toBeFalsy();

    email.setValue('invalid_email');
    expect(email.valid).toBeFalsy();

    email.setValue('test@example.com');
    expect(email.valid).toBeTruthy();
  });

  it('should validate password field as required', () => {
    const password = component.registerForm.controls['password'];
    expect(password.valid).toBeFalsy();

    password.setValue('password');
    expect(password.valid).toBeTruthy();
  });

  it('should validate role field as required', () => {
    const role = component.registerForm.controls['role'];
    expect(role.valid).toBeFalsy();

    role.setValue('admin');
    expect(role.valid).toBeTruthy();
  });

  it('should call the register API and navigate to login page on successful registration', () => {
    apiService.register.and.returnValue(of({}));
    component.onRegister();
    expect(apiService.register).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['login']);
    expect(spinner.show).toHaveBeenCalled();
    expect(spinner.hide).toHaveBeenCalled();
  });

});