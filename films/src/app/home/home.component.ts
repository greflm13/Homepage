import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public folders = [];

  constructor(private http: HttpService) {}

  ngOnInit() {
    console.log('jes');
    this.http.get('list').then(res => {
      this.folders = res;
      console.log(this.folders);
    });
  }
}
