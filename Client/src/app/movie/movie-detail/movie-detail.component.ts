import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { RepositoryService } from '../../../shared/repository.service';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movie: Movie;
  // public movies: Movie[];

  constructor(
    private route: ActivatedRoute,
    // private movieService: MovieService,
    private location: Location,
    private repository: RepositoryService
  ) {}

  ngOnInit(): void {
    this.getMovie();
  }

  getMovie(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    // this.movieService.getMovie(id).subscribe(movie => (this.movie = movie));
    let apiAddress: string = `api/movie/${id}`;
    // this.repository.getData(apiAddress).subscribe(res => {
    //   this.movies = res as Movie[];
    // });
    this.repository.getData(apiAddress).subscribe(res => {
      this.movie = res as Movie;
    });
  }

  goBack(): void {
    this.location.back();
  }

  // rate(): void {
  //   this.movieService.updateMovie(this.movie).subscribe(() => this.goBack());
  // }
}
