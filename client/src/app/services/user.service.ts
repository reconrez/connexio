import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient, public router: Router) { }

  getUsers() {}

  getUserById(user_id: string) {
    return this.http.post<any>(`${this.baseUrl}/user`, {user_id})
  }
  handleError(handleError: any) {
    throw new Error('Method not implemented.');
  }
}
