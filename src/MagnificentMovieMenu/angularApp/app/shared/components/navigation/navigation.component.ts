import { Component } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { MovieService } from '../../../core/services/movie-data.service';
import { Movie } from '../../../models/movie';

@Component({
  selector: 'app-navigation',
  templateUrl: 'navigation.component.html'
})
export class NavigationComponent {
  movies$: Observable<Movie[]>;
  private searchTerms = new Subject<string>();

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.movies$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(200),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap(() => this.movieService.getAll())
    );
  }

  // Push a search term into the observable stream.
  search(term: string): void {
    if (term.length < 3) this.searchTerms.next('');
    if (term.length >= 3) this.searchTerms.next(term);
  }

  clear() {
    this.searchTerms = new Subject<string>();
  }
}
