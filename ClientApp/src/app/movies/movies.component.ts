import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Movie } from '../movie';
import { MovieService } from '../movie.service';
import { List } from '../list';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  movies: Movie[];
  list: List;
  name: String;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute
  ) {
    this.list;
    this.name = this.route.snapshot.params['name'];
  }

  ngOnInit() {
    this.getMovies();
  }

  getMovies(): void {
    this.movieService
      .getMovies()
      .subscribe(
        movies =>
          (this.movies = movies.filter(
            movie => movie.category === this.route.snapshot.params['name']
          ))
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
