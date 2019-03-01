import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Configuration } from './../../app.constants';
import { List } from './../../models/list';

@Injectable()
export class ListService {
  private actionUrl: string;
    private headers: HttpHeaders;
    private num: number;

  constructor(private http: HttpClient, configuration: Configuration) {
    this.actionUrl = configuration.Server + 'api/lists/';
    this.headers = new HttpHeaders();
    this.headers = this.headers.set('Content-Type', 'application/json');
    this.headers = this.headers.set('Accept', 'application/json');
      this.headers = this.headers.set('Access-Control-Allow-Origin', '*');
      this.num = 0;
  }

  getAll(): Observable<List[]> {
      this.http.get<List[]>(this.actionUrl, { headers: this.headers }).subscribe(result => {this.num = result.length});
      return this.http.get<List[]>(this.actionUrl, { headers: this.headers });
  }

  getSingle(id: number): Observable<List> {
    return this.http.get<List>(this.actionUrl + id, { headers: this.headers });
  }

  add(listToAdd: List): Observable<List> {
      const toAdd = JSON.stringify({ id: this.num, name: listToAdd.name });

    return this.http.post<List>(this.actionUrl, toAdd, {
      headers: this.headers
    });
  }

  update(id: number, itemToUpdate: any): Observable<List> {
    return this.http.put<List>(
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
