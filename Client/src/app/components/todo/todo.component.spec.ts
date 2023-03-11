import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ApiService } from '../../services/api.service';
import { TodoComponent } from './todo.component';
import { DialogComponent } from '../common/dialog/dialog.component';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let matDialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    const apiSpy = jasmine.createSpyObj('ApiService', ['getTodos', 'updateTodo', 'deleteTodo', 'translateTodo']);
    await TestBed.configureTestingModule({
      declarations: [TodoComponent, DialogComponent],
      imports: [
        BrowserAnimationsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatSelectModule,
        MatDividerModule,
        NgxSpinnerModule,
      ],
      providers: [
        { provide: ApiService, useValue: apiSpy },
        { provide: MatDialog, useValue: matDialog }
      ],
    })
      .compileComponents();

    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });


  describe('getTodos', () => {
    it('should call ApiService.getTodos and set the component todos', () => {
      const todos = [
        { id: '1', title: 'Todo 1', description: 'Description 1', isDone: false, userId: '1', createdAt: '2022-01-01' },
        { id: '2', title: 'Todo 2', description: 'Description 2', isDone: true, userId: '1', createdAt: '2022-01-02' },
      ];
      apiServiceSpy.getTodos.and.returnValue(of(todos));

      component.getTodos();

      expect(apiServiceSpy.getTodos).toHaveBeenCalled();
      expect(component.todos).toEqual(todos);
    });
  });

  describe('updateTodo', () => {
    it('should call ApiService.updateTodo and refresh todos', () => {
      const todo = { id: '1', title: 'Todo 1', description: 'Description 1', isDone: false, userId: '1', createdAt: '2022-01-01' };
      apiServiceSpy.updateTodo.and.returnValue(of({}));

      component.updateTodo({ target: { value: todo } });

      expect(apiServiceSpy.updateTodo).toHaveBeenCalledWith({ ...todo, isDone: true }, todo.id);
      expect(apiServiceSpy.getTodos).toHaveBeenCalled();
    });
  });

  describe('deleteTodo', () => {
    it('should call ApiService.deleteTodo and refresh todos', () => {
      const todoId = '1';
      apiServiceSpy.deleteTodo.and.returnValue(of({}));

      component.deleteTodo({ target: { value: todoId } });

      expect(apiServiceSpy.deleteTodo).toHaveBeenCalledWith(todoId);
      expect(apiServiceSpy.getTodos).toHaveBeenCalled();
    });
  });

  describe('translate', () => {
    it('should call ApiService.translateTodo() with correct data when language is selected and there are todos', () => {
      const selectedLanguage = 'es';
      const translatedTitle = ['1_Translated Title 1', '2_Translated Title 2', '3_Translated Title 3'];
      const todos = [
        { id: "1", title: 'Title 1', description: 'asdas', createdAt: '2022-01-01', isDone: false },
        { id: "2", title: 'Title 2', description: 'asdas', createdAt: '2022-01-02', isDone: false },
        { id: "3", title: 'Title 3', description: 'asdas', createdAt: '2022-01-03', isDone: true },
      ];
      const todosTitles = ['1_Title 1', '2_Title 2', '3_Title 3'];
      const expectedData = { data: todosTitles, target: selectedLanguage };
      const expectedTranslatedTodos = [
        { id: "1", title: 'Translated Title 1', description: 'asdas', createdAt: '2022-01-01', isDone: false },
        { id: "2", title: 'Translated Title 2', description: 'asdas', createdAt: '2022-01-02', isDone: false },
        { id: "3", title: 'Translated Title 3', description: 'asdas', createdAt: '2022-01-03', isDone: true },
      ];

      apiServiceSpy.translateTodo.and.returnValue(of({ translatedTitle }));

      component.todos = todos;
      component.todosTitles = todosTitles;
      component.translateTodo({ value: selectedLanguage });

      expect(apiServiceSpy.translateTodo).toHaveBeenCalledWith(expectedData);
      expect(component.todos).toEqual(expectedTranslatedTodos);
      expect(component.spinner).toBeFalse();
    });

    it('should not call ApiService.translateTodo() when no language is selected', () => {
      const selectedLanguage = 'None';
      const todos = [
        { id: "1", title: 'Title 1', description: 'asdas', createdAt: '2022-01-01', isDone: false },
        { id: "2", title: 'Title 2', description: 'asdas', createdAt: '2022-01-02', isDone: false },
        { id: "3", title: 'Title 3', description: 'asdas', createdAt: '2022-01-03', isDone: true },
      ];
      const todosTitles = ['1_Title 1', '2_Title 2', '3_Title 3'];

      component.todos = todos;
      component.todosTitles = todosTitles;
      component.translateTodo({ value: selectedLanguage });

      expect(apiServiceSpy.translateTodo).not.toHaveBeenCalled();
    });
  });


});