import { Component, OnInit, DoCheck } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'fahrtenbuch-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, DoCheck {
  public data: Data;
  public date: Date;
  public name: string;
  public before: number;
  public after: number;
  public diff: number;


  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.http.get('data').then(res => {
      this.data = res;
      this.before = this.data.trips[this.data.trips.length-1].after;
    });
  }

  ngDoCheck(): void {
    if (this.before != undefined && this.after != undefined) {
      this.diff = this.after - this.before;
    } else {
      this.diff = undefined
    }
  }

  onSubmit() {
    if (this.date != undefined && this.name != undefined && this.before != undefined && this.after != undefined && this.diff != undefined && this.after > this.before) {
      this.diff = this.after - this.before;
      this.data.trips.push({ date: this.date, name: this.name, before: this.before, after: this.after, diff: this.diff });
      this.http.post('data', this.data).then(res => {
        this.data = res;
        this.date = undefined;
        this.name = undefined;
        this.before = undefined;
        this.after = undefined;
        this.diff = undefined;
      });
    }
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