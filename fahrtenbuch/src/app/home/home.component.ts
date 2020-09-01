import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'fahrtenbuch-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public data: Data;


  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.http.get('data').then(res => {
      this.data = res;
    })
  }

}

interface Data {
  trips: Trip[]
}

interface Trip {
  date: Date;
  name: string;
  before: number;
  after: number;
  diff: number;
}