import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CustomerRequest } from './customer-request';
import { environment } from '../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CustomerRequestService {
  private url = `${environment.server}/api/customerRequest`;

  constructor(private http: HttpClient) {}

  getCustomerRequests(): Observable<CustomerRequest[]> {
    return this.http.get<CustomerRequest[]>(this.url).pipe(
      catchError(this.handleError<CustomerRequest[]>(`getAllCustomerRequests`))
    );
  }

  addCustomerRequest(customer: CustomerRequest): Observable<CustomerRequest> {
    return this.http.post<CustomerRequest>(this.url, customer, httpOptions)
      .pipe(
        catchError(this.handleError<CustomerRequest>('addCustomerRequest', customer))
      );
  }

  deleteCustomerRequest(id: string): Observable<CustomerRequest> {
    return this.http.delete<CustomerRequest>(`${this.url}/${id}`, httpOptions).pipe(
      catchError(this.handleError<CustomerRequest>('deleteCustomerRequest'))
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
