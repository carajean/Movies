// tslint:disable:max-line-length
import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Configuration } from './../../app.constants';
import { Movie } from './../../models/movie';
// import { IMDB } from './../../models/IMDB';

@Injectable()
export class MovieService {
  private actionUrl: string;
  private headers: HttpHeaders;
  private num: number;
  private searchUrl = 'https://api.themoviedb.org/3/search/movie';
  private apiKey = 'fe73970a74055db0be8b3f69e988d6e9';
  private language = 'en';

  constructor(
    private http: HttpClient,
    configuration: Configuration,
    private imdbHttp: Http
  ) {
    this.actionUrl = configuration.Server + 'api/movie/';
    this.headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');
    this.headers = this.headers.set('Accept', 'application/json');
    this.headers = this.headers.set('Content-Type', 'application/json');
    this.num = 0;
  }

  /* GET movies whose name contains search term */
  searchMovies(term: string) {
    if (term.trim().length < 3) {
      // if not search term, return empty movie array.
      return;
    } else {
      term = term.split(' ').join('%20');
    }
    const searchUrl = `${this.searchUrl}?api_key=${this.apiKey}&language=${
      this.language
    }&query=${term}`;

    return this.imdbHttp.get(searchUrl).subscribe(res => {
      console.log('RESULTS: ', res.json().results[0].title);
      res.json().results[0];
    });
  }

  getAll(): Observable<Movie[]> {
    this.http
      .get<Movie[]>(this.actionUrl, { headers: this.headers })
      .subscribe(result => {
        result.forEach(m => (m.slug = m.name.split(' ').join('')));
        this.num = result ? result[result.length - 1].id + 1 : 1;
      });
    return this.http.get<Movie[]>(this.actionUrl, { headers: this.headers });
  }

  getSingle(slug: string): Observable<Movie> {
    return this.http.get<Movie>(this.actionUrl + slug, {
      headers: this.headers
    });
  }

  add(movieToAdd: Movie): Observable<Movie> {
    const toAdd = JSON.stringify({
      id: this.num,
      name: movieToAdd.name,
      year: movieToAdd.year,
      category: movieToAdd.category,
      rating: movieToAdd.rating
    });

    return this.http.post<Movie>(this.actionUrl, toAdd, {
      headers: this.headers
    });
  }

  update(id: number, itemToUpdate: any): Observable<Movie> {
    return this.http.put<Movie>(
      this.actionUrl + id,
      JSON.stringify(itemToUpdate),
      {
        headers: this.headers
      }
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(this.actionUrl + id, {
      headers: this.headers
    });
  }
}
