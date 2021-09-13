import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IContact } from 'src/app/models/contact';
import { NotificationService } from './notification.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()

export class ContactService {
  errorMessage = '';
  private apiURL = 'http://localhost:5000/api/contacts';
  private searchURL = 'http://localhost:5000/api/search';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient,
              private notifyservice: NotificationService
  ) { }


  getAllContact(page: number, pagesize: number): Observable<any> {
    const params = new HttpParams()
      .set('PageNumber', page.toString())
      .set('PageSize', pagesize.toString());
    return this.httpClient.get<any>(this.apiURL, { params })
      .pipe(
        catchError(this.handleError)

    );
  }
  getById(id: string): Observable<IContact>  {
    const newurl = `${this.apiURL}/${id}`;
    return this.httpClient.get<IContact>(newurl).pipe(
      catchError(this.handleError)
    );
}

  addContact(params: IContact) {

    return this.httpClient.post(this.apiURL, params).pipe(
      catchError(this.handleError)
    );
}

  updateContact(id: string, params: IContact) {
    const newurl = `${this.apiURL}/${id}`;
    return this.httpClient.put(newurl, params).pipe(
      catchError(this.handleError)
    );
}

  deleteContact(id: string) {
    return this.httpClient.delete(`${this.apiURL}/${id}`).pipe(
      catchError(this.handleError)
    );
}

  search(firstname: string, lastname: string, pagesize: number, page: number): Observable<any> {
    const params = new HttpParams()
      .set('firstname', firstname)
      .set('lastname', lastname)
      .set('PageNumber', page.toString())
      .set('PageSize', pagesize.toString());
    return this.httpClient.get<any>(this.searchURL, { params })
      .pipe(
        catchError(this.handleError)
      );

  }


  // custom handler
  public handleError(err: HttpErrorResponse) {

    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      this.errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      switch (err.status) {
        case 400:
          this.errorMessage = `Backend error is ${ err.error.title } .Bad Request.`;
          break;
        case 401:
          this.errorMessage = `Backend error is ${err.error.title} .You need to log in to do this action.`;
          break;
        case 403:
          this.errorMessage = `Backend error is ${err.error.title} You don't have permission to access the requested resource.`;
          break;
        case 404:
          this.errorMessage = `Backend error is ${err.error.title}  The requested resource does not exist.`;
          break;
        case 412:
          this.errorMessage = `Backend error is ${err.error.title}  Precondition Failed.`;
          break;
        case 500:
          this.errorMessage = `Backend error is ${err.error.title} Internal Server Error.`;
          break;
        case 503:
          this.errorMessage = `Backend error is ${err.error.title} The requested service is not available.`;
          break;
        case 422:
          this.errorMessage = `Backend error is ${err.error.title} Validation Error!`;
          break;
        default:
          this.errorMessage = 'Something went wrong!';
      }
    }
    // return an observable with a user-facing error message
    return throwError(this.errorMessage);
  }



}
