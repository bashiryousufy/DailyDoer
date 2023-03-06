import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environment/environment";
import { Observable } from 'rxjs';
import { Todo } from '../components/todo/todo.component';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string = environment.apiBaseUrl;

  constructor(
    private http: HttpClient
  ) { }

  getToken(): any {
    return new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
  }

  login(data: any): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}/auth/login`, data);
  }

  register(data: any): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}/auth/register`, data);
  }

  getTodos(): Observable<any> {
    return this.http
      .get<any>(`${this.baseUrl}/todo`, {
        headers: this.getToken(),
      });
  }

  createTodo(data: Todo): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}/todo`, data, {
        headers: this.getToken(),
      });
  }

  updateTodo(data: any, todoId: String): Observable<any> {
    return this.http
      .put<any>(`${this.baseUrl}/todo/${todoId}`, data, {
        headers: this.getToken(),
      });
  }

  deleteTodo(todoId: String): Observable<any> {
    return this.http
      .delete<any>(`${this.baseUrl}/todo/${todoId}`, {
        headers: this.getToken(),
      });
  }

}
