import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MovieService } from './../../core/services/movie-data.service';
import { Movie } from './../../models/movie';

@Component({
  selector: 'app-category-component',
  templateUrl: './category.component.html'
})
export class CategoryComponent implements OnInit {
  message: string;
  nextNum: number;
  category: string;
  movies: Movie[] = [];
  movie: Movie = new Movie();

  constructor(
    private dataService: MovieService,
    private route: ActivatedRoute
  ) {
    this.message = this.category;
  }

  ngOnInit() {
    this.getMoviesByCategory();
    this.nextNum = 0;
    this.category = this.route.snapshot.paramMap.get('name');
    console.log(`Now viewing category: ${this.category}`);
  }

  addMovie() {
    this.dataService.add(this.movie).subscribe(
      () => {
        this.getMoviesByCategory();
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
        this.getMoviesByCategory();
      },
      error => {
        console.log(error);
      }
    );
  }

  private getMoviesByCategory() {
    this.dataService
      .getAll()
      .subscribe(
        data => (
          (this.movies = data.filter(m => m.category === this.category)),
          (this.nextNum = data.length)
        ),
        error => console.log(error),
        () => console.log(`Category saved with ${this.nextNum} movies`)
      );
  }
}
