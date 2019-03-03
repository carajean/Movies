import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { MovieService } from './../../core/services/movie-data.service';
import { IMDBService } from './../../core/services/imdb.service';
import { Movie } from './../../models/movie';
import { IMDB } from './../../models/IMDB';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html'
})
export class MovieDetailComponent implements OnInit {
  message: string;
  nextNum!: number;
  slug!: string;
  movies: Movie[] = [];
  movie!: Movie;
  selectedMovie!: IMDB;
  queryName!: string;

  constructor(
    private dataService: MovieService,
    private imdbService: IMDBService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.message = this.slug;
  }

  ngOnInit() {
    this.slug = this.route.snapshot.paramMap.get(`slug`) || '';
    this.getMovie();
    this.nextNum = 0;
    this.searchMovie();
  }

  private getMovie() {
    this.dataService
      .getAll()
      .subscribe(
        res => (this.movie = res.filter(m => m.slug === this.slug)[0]),
        error => console.log(error)
      );
  }

  private searchMovie(): any {
    // this.queryName = this.movie.name.split(' ').join('%20');
    return this.imdbService
      .searchMovies('Avatar')
      .subscribe(
        res => (
          (this.selectedMovie = res.json().results[0]),
          console.log(this.selectedMovie)
        ),
        error => console.log(error)
      );
  }

  addMovie() {
    this.dataService.add(this.movie).subscribe(
      () => {
        this.getMovie();
        this.movie.id = this.nextNum;
        this.movie = new Movie();
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteMovie(movie: Movie) {
    this.dataService.delete(movie.id).subscribe(
      () => {
        this.getMovie();
      },
      error => {
        console.log(error);
      }
    );
  }

  goBack(): void {
    this.location.back();
  }

  rate(): void {
    // this.movieService.updateMovie(this.movie).subscribe(() => this.goBack());
  }
}
