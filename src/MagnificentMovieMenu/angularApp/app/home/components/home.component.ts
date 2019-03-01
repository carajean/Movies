import { Component, OnInit } from '@angular/core';

import { ListService } from './../../core/services/list-data.service';
import { List } from './../../models/list';

@Component({
  selector: 'app-home-component',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  message: string;
  nextNum: number;
  lists: List[] = [];
  list: List = new List();

  constructor(private dataService: ListService) {
    this.message = 'Magnificent Movie Menu';
  }

  ngOnInit() {
    this.getAllLists();
    this.nextNum = 0;
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
        error => console.log(error),
        () => console.log(`List saved of ${this.nextNum} items`)
      );
  }
}
