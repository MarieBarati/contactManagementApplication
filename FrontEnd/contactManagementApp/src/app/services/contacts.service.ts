import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IContact } from 'src/models/contact';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()

export class ContactService {
  private apiURL = "http://localhost:5000/api/contacts";
   
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  
  constructor(private httpClient: HttpClient) { }
   

  // get all contact data
  getAllContact(): Observable<IContact[]> {
    
    return this.httpClient.get<IContact[]>(this.apiURL)
      .pipe(
        catchError(this.handleError)
    );

  }
  getById(id: string) {
    const newurl = `${this.apiURL}/${id}`;  
    return this.httpClient.get<IContact>(newurl);
}

  addContact(params: IContact) {
    console.log(params)
    return this.httpClient.post(this.apiURL, params);
}

  updateContact(id: string, params: IContact) {
    const newurl = `${this.apiURL}/${id}`;
    return this.httpClient.put(newurl, params);
}

  deleteContact(id: string) {
    console.log(id)
    return this.httpClient.delete(`${this.apiURL}/${id}`);
}



  // custom handler
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
