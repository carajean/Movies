import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Movie } from './movie';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class MovieService {
  private moviesUrl = 'api/movies'; // URL to web api

  constructor(private http: HttpClient) {}

  /** GET movies from the server */
  getMovies(): Observable<Movie[]> {
    return this.http
      .get<Movie[]>(this.moviesUrl)
      .pipe(catchError(this.handleError('getMovies', [])));
  }

  /** GET movie by id. Return `undefined` when id not found */
  getMovieNo404<Data>(id: number): Observable<Movie> {
    const url = `${this.moviesUrl}/?id=${id}`;
    return this.http.get<Movie[]>(url).pipe(
      map(movies => movies[0]), // returns a {0|1} element array
      catchError(this.handleError<Movie>(`getMovie id=${id}`))
    );
  }

  /** GET movie by id. Will 404 if id not found */
  getMovie(id: number): Observable<Movie> {
    const url = `${this.moviesUrl}/${id}`;
    return this.http
      .get<Movie>(url)
      .pipe(catchError(this.handleError<Movie>(`getMovie id=${id}`)));
  }

  /* GET movies whose name contains search term */
  searchMovies(term: string): Observable<Movie[]> {
    if (term.trim().length < 3) {
      // if not search term, return empty movie array.
      return of([]);
    }
    return this.http
      .get<Movie[]>(`${this.moviesUrl}/?name=${term}`)
      .pipe(catchError(this.handleError<Movie[]>('searchMovies', [])));
  }

  //////// Save methods //////////

  /** POST: add a new movie to the server */
  addMovie(movie: Movie): Observable<Movie> {
    return this.http
      .post<Movie>(this.moviesUrl, movie, httpOptions)
      .pipe(catchError(this.handleError<Movie>('addMovie')));
  }

  /** DELETE: delete the movie from the server */
  deleteMovie(movie: Movie | number): Observable<Movie> {
    const id = typeof movie === 'number' ? movie : movie.id;
    const url = `${this.moviesUrl}/${id}`;

    return this.http
      .delete<Movie>(url, httpOptions)
      .pipe(catchError(this.handleError<Movie>('deleteMovie')));
  }

  /** PUT: update the movie on the server */
  updateMovie(movie: Movie): Observable<any> {
    return this.http
      .put(this.moviesUrl, movie, httpOptions)
      .pipe(catchError(this.handleError<any>('updateMovie')));
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

// import { Injectable } from '@angular/core';
// import { HttpClient, HttpParams } from '@angular/common/http';
// import { HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { catchError } from 'rxjs/operators';

// import { Movie } from './movie';

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type': 'application/json',
//     Authorization: 'my-auth-token'
//   })
// };

// @Injectable()
// export class MovieService {
//   moviesUrl = 'api/movie'; // URL to web api

//   constructor(private http: HttpClient) {}

//   /** GET movies from the server */
//   getMovies(): Observable<Movie[]> {
//     return this.http.get<Movie[]>(this.moviesUrl);
//   }

//   /* GET movies whose name contains search term */
//   searchMovies(term: string): Observable<Movie[]> {
//     term = term.trim();

//     // Add safe, URL encoded search parameter if there is a search term
//     const options = term ? { params: new HttpParams().set('name', term) } : {};

//     return this.http.get<Movie[]>(this.moviesUrl, options);
//   }

//   //////// Save methods //////////

//   /** POST: add a new movie to the database */
//   addMovie(movie: Movie): Observable<Movie> {
//     return this.http.post<Movie>(this.moviesUrl, movie, httpOptions);
//   }

//   /** DELETE: delete the movie from the server */
//   deleteMovie(id: number): Observable<{}> {
//     const url = `${this.moviesUrl}/${id}`; // DELETE api/movies/42
//     return this.http.delete(url, httpOptions);
//   }

//   /** PUT: update the movie on the server. Returns the updated movie upon success. */
//   updateMovie(movie: Movie): Observable<Movie> {
//     httpOptions.headers = httpOptions.headers.set(
//       'Authorization',
//       'my-new-auth-token'
//     );

//     return this.http.put<Movie>(this.moviesUrl, movie, httpOptions);
//   }
// }
