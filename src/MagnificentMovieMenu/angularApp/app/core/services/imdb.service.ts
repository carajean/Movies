import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
// import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

// import { IMDB } from '../../models/IMDB';

@Injectable()
export class IMDBService {
  private url = 'https://api.themoviedb.org/3/movie/';
  private searchUrl = 'https://api.themoviedb.org/3/search/movie';
  private apiKey = 'fe73970a74055db0be8b3f69e988d6e9';
  private language = 'en';

  constructor(private http: Http) {}

  getMovies() {
    // const moviesUrl = `${this.url}popular?api_key=${this.apiKey}&language=${
    //   this.language
    // }`;
    const sampleUrl =
      'https://api.themoviedb.org/3/movie/550?api_key=fe73970a74055db0be8b3f69e988d6e9';
    this.http.get(sampleUrl).subscribe({
      next(res) {
        console.log(res.json());
      },
      error(msg) {
        console.log('Error Getting IMDB: ', msg);
      }
    });

    // return this.http.get(`https://api.themoviedb.org/3/movie/550?api_key=fe73970a74055db0be8b3f69e988d6e9`)
    // .map((response: Response) => response.json())
    // .do(value => console.log(value));
  }

  searchMovies(query: string) {
    const searchUrl = `${this.searchUrl}?api_key=${this.apiKey}&language=${
      this.language
    }&query=${query}`;

    return this.http.get(searchUrl).map(this.extractData);
  }

  getDetails(id: number) {
    const detailsUrl = `${this.url}${id}?api_key=${this.apiKey}&language=${
      this.language
    }`;

    return this.http.get(detailsUrl).map(res => {
      return res.json();
    });
  }

  private extractData(res: Response) {
    const body = res.json();
    return body.results || {};
  }
}
