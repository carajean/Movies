import { Component, OnInit } from '@angular/core';
import { List } from '../list';
import { ListService } from '../list.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  lists: List[];

  constructor(private listService: ListService) {}

  ngOnInit() {
    this.getLists();
  }

  getLists(): void {
    this.listService.getLists().subscribe(lists => (this.lists = lists));
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.listService.addList({ name } as List).subscribe(list => {
      this.lists.push(list);
    });
  }

  delete(list: List): void {
    this.lists = this.lists.filter(h => h !== list);
    this.listService.deleteList(list).subscribe();
  }
}
