import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Customer } from './customer';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CustomerService {

  private url = '/api/customer';

  constructor(
    private http: HttpClient
  ) {}

  /** GET realestate by id. Will 404 if id not found */
  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.url).pipe(
      catchError(this.handleError<Customer[]>(`getAllCustomers`))
    );
  }

  /** POST: add a new hero to the database */
  addCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.url, customer, httpOptions)
      .pipe(
        catchError(this.handleError<Customer>('addCustomer', customer))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation: string, result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
