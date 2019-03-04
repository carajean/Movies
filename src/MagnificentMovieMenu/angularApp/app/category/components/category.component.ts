import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

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
  queryName!: string;
  imdbMovies: IMDB[] = [];

  constructor(
    private dataService: MovieService,
    private imdbService: IMDBService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.getIMDBMovies();
  }

  ngOnInit() {
    this.category = this.route.snapshot.paramMap.get('name') || '';
    if (this.category !== 'all' && this.category !== 'All Movies') {
      this.getMoviesByCategory();
    } else {
      this.category = 'All Movies';
      this.getAllMovies();
    }
  }

  ngAfterViewInit() {
    this.movies = [];
    this.category = this.route.snapshot.paramMap.get('name') || '';
    if (this.category !== 'all' && this.category !== 'All Movies') {
      this.getMoviesByCategory();
    } else {
      this.category = 'All Movies';
      this.getAllMovies();
    }
  }

  ngOnDestroy() {
    this.movies = [];
  }

  private getAllMovies() {
    this.dataService.getAll().subscribe(data => (this.movies = data));
  }

  private getIMDBMovies() {
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
              slug: m.slug,
              rating: m.rating,
              img: m.img
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

  private getMoviesByCategory() {
    this.dataService.getAll().subscribe(
      data => (
        (this.movies = data.filter(m => m.category === this.category)),
        this.movies.forEach(m => {
          this.queryName = m.name.split(' ').join('%20');
          this.imdbService.searchMovies(this.queryName).subscribe(
            res => (
              this.imdbMovies.push(res.json().results[0]),
              this.dataService
                .update(m.id, {
                  name: this.imdbMovies[this.imdbMovies.length - 1].title,
                  year: this.imdbMovies[
                    this.imdbMovies.length - 1
                  ].release_date.slice(0, 4),
                  category: m.category,
                  slug: m.slug,
                  img: this.imdbMovies[this.imdbMovies.length - 1].poster_path,
                  rating: m.rating
                })
                .subscribe(slugM => {
                  m = slugM;
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

  addMovie() {
    this.movie.id = this.nextNum;
    this.movie.category = this.category;
    this.queryName = this.movie.name.split(' ').join('%20');
    this.imdbService.searchMovies(this.queryName).subscribe(
      res => (
        (this.movie.year = res.json().results[0].release_date.slice(0, 4)),
        (this.movie.slug = res
          .json()
          .results[0].title.split(' ')
          .join('')),
        console.log(this.movie),
        this.dataService
          .add({
            id: this.nextNum,
            name: this.movie.name,
            year: this.movie.year,
            category: this.category,
            rating: null,
            slug: res
              .json()
              .results[0].title.split(' ')
              .join(''),
            img: this.movie.img
          })
          .subscribe(
            () => {
              this.getMoviesByCategory();
              this.movie = new Movie();
            },
            error => {
              console.log(error);
            }
          )
      )
    );
    this.location.go(`localhost:8080/api/movie/${this.movie.slug}`);
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
                this.getMoviesByCategory();
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

  sortByCategory() {
    this.movies = this.movies.sort((a, b) =>
      a.category > b.category ? 1 : b.category > a.category ? -1 : 0
    );
  }

  sortByRating() {
    this.movies = this.movies.sort((a, b) =>
      a.rating < b.rating ? 1 : b.rating < a.rating ? -1 : 0
    );
  }

  sortByTitle() {
    this.movies = this.movies.sort((a, b) =>
      a.name > b.name ? 1 : b.name > a.name ? -1 : 0
    );
  }
}
