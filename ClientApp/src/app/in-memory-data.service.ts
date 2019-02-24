import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Movie } from './movie';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const movies = [
      { id: 11, name: 'Mr. Nice', year: 2019 },
      { id: 12, name: 'Narco', year: 2019 },
      { id: 13, name: 'Bombasto', year: 2019 },
      { id: 14, name: 'Celeritas', year: 2019 },
      { id: 15, name: 'Magneta', year: 2019 },
      { id: 16, name: 'RubberMan', year: 2019 },
      { id: 17, name: 'Dynama', year: 2019 },
      { id: 18, name: 'Dr IQ', year: 2019 },
      { id: 19, name: 'Magma', year: 2019 },
      { id: 20, name: 'Tornado', year: 2019 }
    ];
    return { movies };
  }

  // Overrides the genId method to ensure that a movie always has an id.
  // If the movies array is empty,
  // the method below returns the initial number (11).
  // if the movies array is not empty, the method below returns the highest
  // movie id + 1.
  genId(movies: Movie[]): number {
    return movies.length > 0
      ? Math.max(...movies.map(movie => movie.id)) + 1
      : 11;
  }
}
