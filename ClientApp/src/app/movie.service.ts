import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Movie } from './movie';
import { MOVIES } from './mock-movies';

@Injectable({ providedIn: 'root' })
export class MovieService {
  constructor() {}

  getMovies(): Observable<Movie[]> {
    // TODO: send the message _after_ fetching the movies
    return of(MOVIES);
  }

  getMovie(id: number): Observable<Movie> {
    // TODO: send the message _after_ fetching the movie
    return of(MOVIES.find(movie => movie.id === id));
  }
}
