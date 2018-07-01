import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Realestate } from './realestate';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class RealestateService {

  private realesateUrl = 'http://localhost:3000/realestate';

  constructor(
    private http: HttpClient
  ) {}

  /** GET realestate by id. Will 404 if id not found */
  getRealestate(id: string): Observable<Realestate> {
    const url = `${this.realesateUrl}/${id}`;
    return this.http.get<Realestate>(url).pipe(
      catchError(this.handleError<Realestate>(`getRealestate id=${id}`))
    );
  }

  /** POST: add a new hero to the database */
  addRealestate (realestate: Realestate): Observable<Realestate> {
    return this.http.post<Realestate>(this.realesateUrl, realestate, httpOptions)
      .pipe(
        catchError(this.handleError<Realestate>('addRealestate', realestate))
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
