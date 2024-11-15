import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiscussionService {

  private readonly baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  attachmentFile = new BehaviorSubject<File>(null);
  
  createDiscussion(discussion: any){
    console.log(discussion); 
    return this.http.post<any>(`${this.baseUrl}/discussion`, discussion)
      .subscribe((res: any) => {
        console.log(res);
        this.getAllDiscussions();
        (error: any) => {
          catchError(this.handleError)
        }
      })
  }

  getAllDiscussions() {
    return this.http.get<any[]>(`${this.baseUrl}/discussions`)
  }

  getDiscussionById(id: string){
    return this.http.get<any>(`${this.baseUrl}/discussion/${id}`)
      .pipe(
        catchError(this.handleError),
        map(discussion => discussion || null) // Handle cases where the discussion may not exist
      );
  }

  updateDiscussion(id: string, discussion: any){
    return this.http.put<any>(`${this.baseUrl}/discussion/${id}`, discussion)
      .pipe(
        catchError(this.handleError),
        map(discussion => discussion || null) // Handle cases where the update may fail
      );
  }

  deleteDiscussion(id: string){
    return this.http.delete<void>(`${this.baseUrl}/discussion/:${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  createResponse(response: any){
    // Update URL and body to include discussion ID
    console.log(`============${response}============`);
    return this.http.post<any>(`${this.baseUrl}/response/`, response)
    .subscribe((res: any) => {
      console.log(res);
      (error: any) => {
        catchError(this.handleError)
      }
    })
  }
  attachmentAddition(attachment: FormGroup) {
    const fileAttachment = new FormData();
    fileAttachment.append('attachment', attachment.get('attachment').value);
    console.log(attachment);
    console.log(attachment.get('attachment').value);
    console.log(fileAttachment);
    console.log(fileAttachment.get('attachment'));
    console.log(FormData);
    return this.http.post(`${this.baseUrl}/upload`, fileAttachment, { headers: new HttpHeaders({ 'Content-Type':'multipart/form-data' })});
    // return this.http.post(`${this.baseUrl}/upload`, {hello : "Hello"});
    // return this.http.post(`${this.baseUrl}/upload`, fileAttachment, { headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data', 'boundary':'no' })});
  }

  getAllResponses(discussionId: string){
    // Update URL to include discussion ID
    return this.http.get<any[]>(`${this.baseUrl}/response`)
  }

  deleteResponse(id: string){
    return this.http.delete<void>(`${this.baseUrl}/response/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse){
    // Similar error handling logic from PostService
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError('Something went wrong. Please try again later.');
  }
}
