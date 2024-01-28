import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = "http://localhost:3000";

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient, public router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${this.baseUrl}/auth/login`, { username, password })
      .subscribe((res: any) => {
        console.log(`Login Service Console Response ${res}`);
        localStorage.setItem('access_token', res.token);
        this.router.navigate(['home/' + res]);
      });
  }

  logout() {
    return this.http.post<any>(`${this.baseUrl}/auth/logout`,{})
      .subscribe((res: any) => {
        // Clear local authentication state
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');

        // Update authentication state observable
        this.isAuthenticatedSubject.next(false);

        // Handle client-side cookie clearing (if necessary)
        if (document.cookie) {
          const cookies = document.cookie.split(';');
          cookies.forEach(cookie => {
            const eqPos = cookie.indexOf('=');
            let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
          });
        }

        // Redirect to login page
        this.router.navigate(['/login']);
      });
  }

  register(user: any) {
    return this.http.post(`${this.baseUrl}/users/register`, user);
  }
}
