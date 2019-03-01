import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { IMDB } from './../../models/IMDB';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html'
})
export class MovieSearchComponent implements OnInit {
  movies$!: Observable<IMDB[]>;
  private searchTerms = new Subject<string>();

  constructor() {}

  // Push a search term into the observable stream.
  search(term: string): void {
    if (term.length < 3) {
      this.searchTerms.next('');
    }
    if (term.length >= 3) {
      this.searchTerms.next(term);
    }
  }

  ngOnInit(): void {}
}
