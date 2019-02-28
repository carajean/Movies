import { Component, OnInit } from '@angular/core';

import { ListService } from './../../core/services/list-data.service';
import { List } from './../../models/list';

@Component({
  selector: 'app-home-component',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  message: string;
  lists: List[] = [];
  list: List = new List();

  constructor(private dataService: ListService) {
    this.message = 'Lists from the ASP.NET Core API';
  }

  ngOnInit() {
    this.getAllLists();
  }

  addList() {
    this.dataService.add(this.list).subscribe(
      () => {
        this.getAllLists();
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
        data => (this.lists = data),
        error => console.log(error),
        () => console.log('Get all complete')
      );
  }
}
