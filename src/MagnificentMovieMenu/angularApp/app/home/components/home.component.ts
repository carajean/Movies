import { Component, OnInit } from '@angular/core';

import { ListService } from './../../core/services/list-data.service';
import { List } from './../../models/list';
import { IMDBService } from './../../core/services/imdb.service';
import { IMDB } from './../../models/IMDB';

@Component({
  selector: 'app-home-component',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  message: string;
  nextNum!: number;
  lists: List[] = [];
  list: List = new List();
  imdbMovies: IMDB[];

  constructor(
    private dataService: ListService,
    private imdbService: IMDBService
  ) {
    this.message = 'Magnificent Movie Menu';
  }

  ngOnInit() {
    this.searchMovies();
    this.getAllLists();
    this.nextNum = 0;
  }

  ngAfterViewInit() {
    this.searchMovies();
  }

  private searchMovies() {
    this.imdbService
      .getMovies()
      .subscribe(res => (this.imdbMovies = res.json().results));
  }

  addList() {
    this.dataService.add(this.list).subscribe(
      () => {
        this.getAllLists();
        this.list.id = this.nextNum;
        this.list = new List();
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteList(list: List) {
    this.dataService.delete(list.id).subscribe(
      () => {
        this.getAllLists();
      },
      error => {
        console.log(error);
      }
    );
  }

  private getAllLists() {
    this.dataService
      .getAll()
      .subscribe(
        data => ((this.lists = data), (this.nextNum = data.length)),
        error => console.log(error)
      );
  }
}
