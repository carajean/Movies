import { Component, OnInit } from '@angular/core';
import { List } from '../list';
import { ListService } from '../list.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // lists: [
  //   { id: 0; name: 'Drama' },
  //   { id: 1; name: 'Sci-Fi' },
  //   { id: 2; name: 'Comedy' }
  // ];
  lists: List[];

  constructor(private listService: ListService) {}

  ngOnInit() {
    this.getLists();
  }

  getLists(): void {
    this.listService.getLists().subscribe(lists => (this.lists = lists));
  }
}
