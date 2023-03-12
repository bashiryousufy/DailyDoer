import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../../services/api.service';
import { LogInComponent } from './log-in.component';

describe('LogInComponent', () => {
  let component: LogInComponent;
  let fixture: ComponentFixture<LogInComponent>;
  let formBuilder: FormBuilder;
  let apiService: jasmine.SpyObj<ApiService>;
  let router: jasmine.SpyObj<Router>;
  let spinner: jasmine.SpyObj<NgxSpinnerService>;

  beforeEach(async () => {
    const apiSpy = jasmine.createSpyObj('ApiService', ['login']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const spinnerSpy = jasmine.createSpyObj('NgxSpinnerService', ['show', 'hide']);

    await TestBed.configureTestingModule({
      declarations: [LogInComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: ApiService, useValue: apiSpy },
        { provide: Router, useValue: routerSpy },
        { provide: NgxSpinnerService, useValue: spinnerSpy },
      ]
    })
      .compileComponents();

    formBuilder = TestBed.inject(FormBuilder);
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    spinner = TestBed.inject(NgxSpinnerService) as jasmine.SpyObj<NgxSpinnerService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogInComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onLogin', () => {
    it('should not make an API call if form is invalid', () => {
      spyOn(apiService, 'login');
      component.loginForm.patchValue({ email: '', password: '' });
      component.onLogin();
      expect(apiService.login).not.toHaveBeenCalled();
    });

    it('should make an API call and navigate to "todos" page on successful login', () => {
      spyOn(apiService, 'login').and.returnValue(of({ accessToken: 'token', userData: { id: 1, role: 'user' } }));
      spyOn(router, 'navigate');
      component.loginForm.patchValue({ email: 'test@test.com', password: 'password' });
      component.onLogin();
      expect(apiService.login).toHaveBeenCalledWith({ email: 'test@test.com', password: 'password' });
      expect(localStorage.getItem('token')).toBe('token');
      expect(localStorage.getItem('userId')).toBe('1');
      expect(localStorage.getItem('role')).toBe('user');
      expect(router.navigate).toHaveBeenCalledWith(['todos']);
      expect(spinner.show).toHaveBeenCalled();
      expect(spinner.hide).toHaveBeenCalled();
    });

    it('should show spinner while making API call', () => {
      spyOn(apiService, 'login').and.returnValue(of({ accessToken: 'token', userData: { id: 1, role: 'user' } }));
      component.loginForm.patchValue({ email: 'test@test.com', password: 'password' });
      component.onLogin();
      expect(spinner.show).toHaveBeenCalled();
      expect(spinner.hide).toHaveBeenCalled();
    });
  });
});