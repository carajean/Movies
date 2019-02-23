import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Movie } from './movie';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const movies = [
      { id: 11, name: 'Harry Potter' },
      { id: 12, name: 'Inception' },
      { id: 13, name: 'Bambi' },
      { id: 14, name: 'Fantastic Beasts' },
      { id: 15, name: "King's Speech" },
      { id: 16, name: 'Princess Bride' },
      { id: 17, name: 'Aquaman' },
      { id: 18, name: 'Alpha' },
      { id: 19, name: 'The Danish Girl' },
      { id: 20, name: 'The Wizard of Oz' }
    ];
    return { movies };
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(movies: Movie[]): number {
    return movies.length > 0
      ? Math.max(...movies.map(movie => movie.id)) + 1
      : 11;
  }
}
