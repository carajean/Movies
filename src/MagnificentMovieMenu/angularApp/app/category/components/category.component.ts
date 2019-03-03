import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MovieService } from './../../core/services/movie-data.service';
import { Movie } from './../../models/movie';
import { IMDBService } from './../../core/services/imdb.service';
import { IMDB } from './../../models/IMDB';

@Component({
  selector: 'app-category-component',
  templateUrl: './category.component.html'
})
export class CategoryComponent implements OnInit {
  nextNum!: number;
  category!: string;
  movies: Movie[] = [];
  slugs: Movie[] = [];
  movie: Movie = new Movie();
  sort!: number;
  queryName: string;
  imdbMovies: IMDB[] = [];
  findMovies: any;
  total_results: number;
  total_pages: number;
  page: number;
  query: string;
  language: string;

  constructor(
    private dataService: MovieService,
    private imdbService: IMDBService,
    private route: ActivatedRoute
  ) {
    this.nextNum = 0;
    this.category = this.route.snapshot.paramMap.get('name') || '';
    if (this.category === 'all') {
      this.category = 'All Movies';
      this.getAllMovies();
    }
  }

  ngOnInit() {
    this.getMoviesByCategory();
  }

  private getMoviesByCategory() {
    this.dataService.getAll().subscribe(
      data => (
        (this.movies = data.filter(m => m.category === this.category)),
        this.movies.forEach(m => {
          m.slug = m.name.split(' ').join('');
          this.queryName = m.name.split(' ').join('%20');
          this.imdbService.searchMovies(this.queryName).subscribe(
            res => (
              this.imdbMovies.unshift(res.json().results[0]),
              this.dataService
                .update(m.id, {
                  name: m.name,
                  year: this.imdbMovies[0].release_date.slice(0, 4),
                  category: m.category,
                  slug: m.slug
                })
                .subscribe(slugM => {
                  this.slugs.push(slugM as Movie);
                })
            ),
            error => console.log(error)
          );
        }),
        (this.nextNum = this.movies.length)
      ),
      error => console.log(error)
    );
    this.movies = this.slugs;
  }

  searchMovies(query: string) {
    const formatQuery = query.split(' ').join('%20');
    this.imdbService
      .searchMovies(formatQuery)
      .subscribe(
        res => (this.findMovies = res.json().results.slice(0, 5)),
        error => console.log(error)
      );
  }

  addMovie() {
    this.movie.id = this.nextNum;
    this.movie.category = this.category;
    this.movie.year = 2019;
    this.dataService.add(this.movie).subscribe(
      () => {
        this.getMoviesByCategory();
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

  private getAllMovies() {
    this.dataService.getAll().subscribe(
      data => (
        (this.movies = data),
        this.movies.forEach(m => {
          m.slug = m.name.split(' ').join('');
          this.dataService
            .update(m.id, {
              name: m.name,
              year: m.year,
              category: m.category,
              slug: m.slug
            })
            .subscribe(slugM => {
              this.slugs.push(slugM as Movie);
            });
        }),
        (this.nextNum = this.movies.length)
      ),
      error => console.log(error)
    );
    this.movies = this.slugs;
  }
}
