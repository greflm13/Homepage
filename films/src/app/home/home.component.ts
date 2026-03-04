import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: false
})
export class HomeComponent implements OnInit {
  public folders = [];

  constructor(private http: HttpService) {}

  ngOnInit() {
    this.http.get('list').then(res => {
      this.folders = res;
    });
  }
}
