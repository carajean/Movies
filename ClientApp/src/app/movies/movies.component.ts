import { Component, OnInit } from '@angular/core';

import { Movie } from '../movie';
import { MovieService } from '../movie.service';
import { List } from '../list';
import { ListService } from '../list.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  movies: Movie[];
  list: string;

  constructor(
    private movieService: MovieService,
    private listService: ListService
  ) {}

  ngOnInit() {
    this.getMovies();
  }

  getMovies(): void {
    this.movieService
      .getMovies()
      .subscribe(
        movies => (this.movies = movies.filter(movie => movie.category === ''))
      );
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.movieService.addMovie({ name } as Movie).subscribe(movie => {
      this.movies.push(movie);
    });
  }

  delete(movie: Movie): void {
    this.movies = this.movies.filter(h => h !== movie);
    this.movieService.deleteMovie(movie).subscribe();
  }
}
