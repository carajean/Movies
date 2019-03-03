import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { of } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class IMDBService {
  private url = 'https://api.themoviedb.org/3/movie/';
  private searchUrl = 'https://api.themoviedb.org/3/search/movie';
  private apiKey = 'fe73970a74055db0be8b3f69e988d6e9';
  private language = 'en';

  constructor(private http: Http) {}

  getMovies() {
    const moviesUrl = `${this.url}popular?api_key=${this.apiKey}&language=${
      this.language
    }`;
    this.http.get(moviesUrl).subscribe({
      next(res) {
        return res.json();
      },
      error(msg) {
        console.log('Error Getting IMDB: ', msg);
      }
    });
  }

  searchMovies(query: string) {
    const searchUrl = `${this.searchUrl}?api_key=${this.apiKey}&language=${
      this.language
    }&query=${query}`;

    return this.http.get(searchUrl);
  }

  findMovies(query: string) {
    if (query.trim().length < 3) {
      // if not search term, return empty movie array.
      return of([]);
    }
    const searchUrl = `${this.searchUrl}?api_key=${this.apiKey}&language=${
      this.language
    }&query=${query}`;
    return this.http.get(searchUrl).subscribe(res => {
      return res.json().title;
    });
  }
}
