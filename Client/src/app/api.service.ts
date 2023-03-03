import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../environment/environment";
import { Observable } from 'rxjs';

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
      .get<any>(`${this.baseUrl}/todo`,{
        headers: this.getToken(),
      });
  }
  
}
