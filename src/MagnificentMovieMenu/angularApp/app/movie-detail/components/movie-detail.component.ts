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
  slug: string;
  movies: Movie[] = [];
  movie: Movie;

  constructor(
    private dataService: MovieService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.message = this.slug;
  }

  ngOnInit() {
    this.slug = this.route.snapshot.paramMap.get(`slug`);
    this.getMovie();
    this.nextNum = 0;
    console.log(`Now viewing movie: ${this.slug}`);
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
      .getAll()
      .subscribe(
        data => (this.movie = data.filter(m => m.slug === this.slug)[0]),
        error => console.log(error),
        () => console.log(`Movie: ${this.movie.name}`)
      );
  }

  goBack(): void {
    this.location.back();
  }

  rate(): void {
    // this.movieService.updateMovie(this.movie).subscribe(() => this.goBack());
  }
}
