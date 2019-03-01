import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Configuration } from './../../app.constants';
import { Movie } from './../../models/movie';

@Injectable()
export class MovieService {
  private actionUrl: string;
  private headers: HttpHeaders;
  private num: number;

  constructor(private http: HttpClient, configuration: Configuration) {
    this.actionUrl = configuration.Server + 'api/movies/';
    this.headers = new HttpHeaders();
    this.headers = this.headers.set('Content-Type', 'application/json');
    this.headers = this.headers.set('Accept', 'application/json');
    this.headers = this.headers.set('Access-Control-Allow-Origin', '*');
    this.num = 0;
  }

  getAll(): Observable<Movie[]> {
    this.http
      .get<Movie[]>(this.actionUrl, { headers: this.headers })
      .subscribe(result => {
        this.num = result ? result[result.length - 1].id + 1 : 1;
      });
    return this.http.get<Movie[]>(this.actionUrl, { headers: this.headers });
  }

  getSingle(id: number): Observable<Movie> {
    return this.http.get<Movie>(this.actionUrl + id, { headers: this.headers });
  }

  add(movieToAdd: Movie): Observable<Movie> {
    const toAdd = JSON.stringify({ id: this.num, name: movieToAdd.name });

    return this.http.post<Movie>(this.actionUrl, toAdd, {
      headers: this.headers
    });
  }

  update(id: number, itemToUpdate: any): Observable<Movie> {
    return this.http.put<Movie>(
      this.actionUrl + id,
      JSON.stringify(itemToUpdate),
      { headers: this.headers }
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(this.actionUrl + id, {
      headers: this.headers
    });
  }
}
