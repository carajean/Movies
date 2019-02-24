import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Movie } from './movie';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const movies = [
      { id: 1, name: 'Mr. Nice', year: 2019, category: 'Drama', rating: null },
      { id: 2, name: 'Narco', year: 2019, category: 'Drama', rating: null },
      { id: 3, name: 'Bombasto', year: 2019, category: 'Drama', rating: null },
      { id: 4, name: 'Celeritas', year: 2019, category: '', rating: null },
      { id: 5, name: 'Magneta', year: 2019, category: '', rating: null },
      { id: 6, name: 'RubberMan', year: 2019, category: '', rating: null },
      { id: 7, name: 'Dynama', year: 2019, category: '', rating: null },
      { id: 8, name: 'Dr IQ', year: 2019, category: 'Comedy', rating: null },
      { id: 9, name: 'Magma', year: 2019, category: '', rating: null },
      { id: 10, name: 'Tornado', year: 2019, category: 'Comedy', rating: null }
    ];
    const lists = [
      { id: 1, name: 'Drama' },
      { id: 2, name: 'Sci-Fi' },
      { id: 3, name: 'Comedy' }
    ];
    return { movies, lists };
  }

  // Overrides the genId method to ensure that a movie always has an id.
  // If the movies array is empty,
  // the method below returns the initial number (1).
  // if the movies array is not empty, the method below returns the highest
  // movie id + 1.
  genId(movies: Movie[]): number {
    return movies.length > 0
      ? Math.max(...movies.map(movie => movie.id)) + 1
      : 1;
  }
}
