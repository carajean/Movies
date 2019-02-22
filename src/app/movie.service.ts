import { Injectable } from '@angular/core';
import { Movie } from './movie';
import { MOVIES } from './mock-movies';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private messageService: MessageService) {}

  getMovies(): Observable<Movie[]> {
    // TODO: send the message _after_ fetching the heroes
    this.messageService.add('MovieService: fetched movies');
    return of(MOVIES);
  }
}
