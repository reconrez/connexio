import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private readonly baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  createPost(post: any){
    console.log(`${this.baseUrl}/post`);
    return this.http.post<any>(`${this.baseUrl}/post`, post)
    .subscribe((res: any) => {
      console.log(res);
      (error: any) => {
        catchError(this.handleError)
      }
     })
  }

  getAllPosts() {
    return this.http.get<any[]>(`${this.baseUrl}/posts`)
  }

  getPostById(id: string): Observable<any | null> {
    return this.http.get<any>(`${this.baseUrl}/${id}`)
      .pipe(
        catchError(this.handleError),
        map(post => post || null) // Handle cases where the post may not exist
      );
  }

  updatePost(id: string, post: any): Observable<any | null> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, post)
      .pipe(
        catchError(this.handleError),
        map(post => post || null) // Handle cases where the update may fail
      );
  }

  deletePost(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(`Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError('Something went wrong. Please try again later.');
  }
}
