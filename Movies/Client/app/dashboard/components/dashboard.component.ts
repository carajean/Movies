// import { Component, OnInit } from '@angular/core';
// import { List } from '../list';
// import { ListService } from '../list.service';

// @Component({
//   selector: 'dashboard',
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.css']
// })
// export class Dashboard implements OnInit {
//   lists: List[];

//   constructor(private listService: ListService) {}

//   ngOnInit() {
//     this.getLists();
//   }

//   getLists(): void {
//     this.listService.getLists().subscribe(lists => (this.lists = lists));
//   }

//   add(name: string): void {
//     name = name.trim();
//     if (!name) {
//       return;
//     }
//     this.listService.addList({ name } as List).subscribe(list => {
//       this.lists.push(list);
//     });
//   }

//   delete(list: List): void {
//     this.lists = this.lists.filter(h => h !== list);
//     this.listService.deleteList(list).subscribe();
//   }
// }

import { Component, OnInit } from '@angular/core';

import { ListService } from './../../core/services/list-data.service';
import { List } from './../../models/list';

@Component({
  selector: 'app-dashboard-component',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  message: string;
  lists: List[] = [];
  list: List = new List();

  constructor(private dataService: ListService) {
    this.message = 'Magnificent Movie Menu';
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
