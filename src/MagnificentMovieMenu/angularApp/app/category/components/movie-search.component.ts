import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { IMDBService } from '../../core/services/imdb.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html'
})
export class MovieSearchComponent implements OnInit {
  movies$: any;
  private searchTerms = new Subject<string>();

  constructor(private imdbService: IMDBService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    if (term.length < 3) this.searchTerms.next('');
    if (term.length >= 3) {
      const formatTerm = term.split(' ').join('%20');
      this.searchTerms.next(formatTerm);
    }
  }

  ngOnInit(): any {
    [Symbol.iterator];
    this.movies$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(200),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string, index: number) =>
        this.imdbService.findMovies(term)
      )
    );
  }
}
