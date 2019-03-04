import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { MovieService } from './../../core/services/movie-data.service';
import { Movie } from './../../models/movie';
import { IMDB } from './../../models/IMDB';

@Component({
  selector: 'app-all-movies-component',
  templateUrl: './all-movies.component.html'
})
export class AllMoviesComponent implements OnInit {
  movies: Movie[] = [];
  movie: Movie = new Movie();
  queryName!: string;
  imdbMovies: IMDB[] = [];

  constructor(private dataService: MovieService) {}

  ngOnInit() {
    this.getAllMovies();
  }

  private getAllMovies() {
    this.dataService.getAll().subscribe(data => (this.movies = data));
  }

  deleteMovie(movie: Movie) {
    this.dataService.delete(movie.id).subscribe(
      () => {
        this.getAllMovies();
      },
      error => {
        console.log(error);
      }
    );
  }

  @Input() rating: number;
  @Output() ratingClick: EventEmitter<any> = new EventEmitter<any>();

  inputName: string;
  id: number;

  onClick(rating: number, slugStr: string): void {
    this.rating = rating;
    this.dataService.getAll().subscribe(
      data => (
        data.filter(m => m.slug === slugStr),
        this.movies.forEach(m => {
          this.id = m.id;
          this.dataService
            .update(this.id, {
              id: this.id,
              name: m.name,
              year: m.year,
              category: m.category,
              slug: m.slug,
              img: m.img,
              rating
            })
            .subscribe(
              () => {
                this.getAllMovies();
                this.movie = new Movie();
              },
              error => {
                console.log(error);
              }
            ),
            this.ratingClick.emit({
              rating: rating
            });
        })
      )
    );
  }
}
