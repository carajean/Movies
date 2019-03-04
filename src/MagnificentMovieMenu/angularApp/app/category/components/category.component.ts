import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
// import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { MovieService } from './../../core/services/movie-data.service';
import { Movie } from './../../models/movie';
import { IMDBService } from './../../core/services/imdb.service';
import { IMDB } from './../../models/IMDB';

@Component({
  selector: 'app-category-component',
  templateUrl: './category.component.html'
})
export class CategoryComponent implements OnInit {
  private searchTerms = new Subject<string>();
  movies$: any;
  nextNum!: number;
  category!: string;
  movies: Movie[] = [];
  slugs: Movie[] = [];
  movie: Movie = new Movie();
  sort!: number;
  queryName!: string;
  imdbMovies: IMDB[] = [];
  findMovies: any;
  total_results!: number;
  total_pages!: number;
  page!: number;
  query!: string;
  language!: string;

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

  search(term: string): void {
    if (term.length < 3) {
      this.searchTerms.next('');
    }
    if (term.length >= 3) {
      const formatTerm = term.split(' ').join('%20');
      this.searchTerms.next(formatTerm);
    }
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

  private getMoviesByCategory() {
    this.dataService.getAll().subscribe(
      data => (
        (this.movies = data.filter(m => m.category === this.category)),
        this.movies.forEach(m => {
          this.queryName = m.name.split(' ').join('%20');
          this.imdbService.searchMovies(this.queryName).subscribe(
            res => (
              this.imdbMovies.unshift(res.json().results[0]),
              this.dataService
                .update(m.id, {
                  name: this.imdbMovies[0].title,
                  year: this.imdbMovies[0].release_date.slice(0, 4),
                  category: m.category,
                  slug: m.slug,
                  img: this.imdbMovies[0].poster_path,
                  rating: m.rating
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
    this.queryName = this.movie.name.split(' ').join('%20');
    this.imdbService.searchMovies(this.queryName).subscribe(
      res => (
        (this.movie.year = res.json().results[0].release_date.slice(0, 4)),
        (this.movie.slug = res
          .json()
          .results[0].title.split(' ')
          .join('')),
        (this.movie.year = res.json().results[0].poster_path),
        this.dataService
          .add({
            id: this.nextNum,
            name: this.movie.name,
            year: this.movie.year,
            category: this.category,
            rating: 0,
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
}
