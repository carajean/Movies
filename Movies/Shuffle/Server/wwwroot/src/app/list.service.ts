import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { List } from './list';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class ListService {
  private listsUrl = 'api/lists'; // URL to web api

  constructor(private http: HttpClient) {}

  /** GET lists from the server */
  getLists(): Observable<List[]> {
    return this.http
      .get<List[]>(this.listsUrl)
      .pipe(catchError(this.handleError('getLists', [])));
  }

  /** GET list by name. Return `undefined` when name not found */
  getListNo404<Data>(name: string): Observable<List> {
    const url = `${this.listsUrl}/?name=${name}`;
    return this.http.get<List[]>(url).pipe(
      map(lists => lists[0]), // returns a {0|1} element array
      catchError(this.handleError<List>(`getList name=${name}`))
    );
  }

  /** GET list by name. Will 404 if name not found */
  getList(name: number): Observable<List> {
    const url = `${this.listsUrl}/${name}`;
    return this.http
      .get<List>(url)
      .pipe(catchError(this.handleError<List>(`getList name=${name}`)));
  }

  /* GET lists whose name contains search term */
  searchLists(term: string): Observable<List[]> {
    if (!term.trim()) {
      // if not search term, return empty list array.
      return of([]);
    }
    return this.http
      .get<List[]>(`${this.listsUrl}/?name=${term}`)
      .pipe(catchError(this.handleError<List[]>('searchLists', [])));
  }

  //////// Save methods //////////

  /** POST: add a new list to the server */
  addList(list: List): Observable<List> {
    return this.http
      .post<List>(this.listsUrl, list, httpOptions)
      .pipe(catchError(this.handleError<List>('addList')));
  }

  /** DELETE: delete the list from the server */
  deleteList(list: List | number): Observable<List> {
    const id = typeof list === 'number' ? list : list.id;
    const url = `${this.listsUrl}/${id}`;

    return this.http
      .delete<List>(url, httpOptions)
      .pipe(catchError(this.handleError<List>('deleteList')));
  }

  /** PUT: update the list on the server */
  updateList(list: List): Observable<any> {
    return this.http
      .put(this.listsUrl, list, httpOptions)
      .pipe(catchError(this.handleError<any>('updateList')));
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
