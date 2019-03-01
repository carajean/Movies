import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { MovieService } from './../../core/services/movie-data.service';
import { Movie } from './../../models/movie';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html'
})
export class MovieDetailComponent implements OnInit {
  message: string;
  nextNum: number;
  title: string;
  movies: Movie[] = [];
  movie: Movie = new Movie();

  constructor(
    private dataService: MovieService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.message = this.title;
  }

  ngOnInit() {
    this.title = this.route.snapshot.paramMap.get(`slug`);
    this.getMovie();
    this.nextNum = 0;
    console.log(`Now viewing movie: ${this.title}`);
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

  private getMovie() {
    this.dataService
      .getSingle(this.title)
      .subscribe(
        data => this.movies.push(data),
        error => console.log(error),
        () => console.log(`Movie: ${this.title}`)
      );
  }

  goBack(): void {
    this.location.back();
  }

  rate(): void {
    // this.movieService.updateMovie(this.movie).subscribe(() => this.goBack());
  }
}
