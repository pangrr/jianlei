import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Realestate } from './realestate';
import { environment } from '../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class RealestateService {

  private url = `${environment.server}/api/realestate`;

  constructor(
    private http: HttpClient
  ) {}

  getRealestate(id: string): Observable<Realestate> {
    return this.http.get<Realestate>(`${this.url}/${id}`).pipe(
      catchError(this.handleError<Realestate>(`getRealestate id=${id}`))
    );
  }

  getRealestates(): Observable<Realestate[]> {
    return this.http.get<Realestate[]>(this.url).pipe(
      catchError(this.handleError<Realestate[]>(`getRealestates`))
    );
  }

  addRealestate(realestate: Realestate): Observable<Realestate> {
    return this.http.post<Realestate>(this.url, realestate, httpOptions).pipe(
      catchError(this.handleError<Realestate>('addRealestate', realestate))
    );
  }

  updateRealestate(realestate: Realestate): Observable<Realestate> {
    return this.http.put<Realestate>(`${this.url}/${realestate._id}`, realestate, httpOptions).pipe(
      catchError(this.handleError<Realestate>('updateRealestate', realestate))
    );
  }

  deleteRealestate(id: string): Observable<Realestate> {
    return this.http.delete<Realestate>(`${this.url}/${id}`, httpOptions).pipe(
      catchError(this.handleError<Realestate>('deleteRealestate'))
    );
  }

  replaceImageNamesWithImageUrls(realestate: Realestate): Realestate {
    realestate.images = realestate.images.map(imageName => `${this.url}/image/${imageName}`);
    return realestate;
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
