import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public msec = window.innerWidth / 3155673600000;
  public half = window.innerHeight / 2.5 + 'px';
  public eventHeight = window.innerHeight / 10 + 'px';
  public lineHeight = window.innerHeight / 50 + 'px';
  public events: Event[] = [];
  public line = (window.innerWidth / 100) * 99 + 'px';
  public name: string;
  public date: string;
  public type: string;
  public nameWrong: string;
  public typeWrong: string;
  public dateWrong: string;

  constructor(private http: HttpService) {}

  ngOnInit() {
    console.log(this.msec);
    setInterval(() => {
      this.msec = window.innerWidth / 3155673600000;
      this.half = window.innerHeight / 2.5 + 'px';
      this.eventHeight = window.innerHeight / 10 + 'px';
      this.lineHeight = window.innerHeight / 50 + 'px';
      this.line = (window.innerWidth / 100) * 99 + 'px';
    }, 100);
    this.http.get('events').then(res => {
      this.events = res;
    });

    // this.events.push({
    //   text: 'Pink Floyd - The Dark Side of the Moon',
    //   date: new Date(1973, 3, 1),
    //   color: 'black',
    //   margin: new Date(1973, 3, 1).getTime() + 2206314000000
    // });
    // this.events.push({
    //   text: 'Pink Floyd - Wish You Were Here',
    //   date: new Date(1975, 9, 12),
    //   color: 'black',
    //   margin: new Date(1975, 9, 12).getTime() + 2206314000000
    // });
    // this.events.push({
    //   text: 'Queen - Queen',
    //   date: new Date(1973, 7, 13),
    //   color: 'orange',
    //   margin: new Date(1973, 7, 13).getTime() + 2206314000000
    // });
  }

  click(year: string) {}

  newEvent() {
    if (this.name === '' || this.name === undefined || this.name === null) {
      this.nameWrong = 'red 3px solid';
    } else {
      this.nameWrong = '';
    }
    if (this.type === '' || this.type === undefined || this.type === null) {
      this.typeWrong = 'red 3px solid';
    } else {
      this.typeWrong = '';
    }
    const event: Event = { text: this.name, date: new Date(this.date), margin: new Date(this.date).getTime() + 2206314000000, color: '' };
    switch (this.type) {
      case 'War':
        event.color = 'black';
        break;
      case 'Album':
        event.color = 'orange';
        break;
      case 'Technology':
        event.color = 'blue';
        break;
      case 'Book':
        event.color = 'green';
        break;
      case 'Politics':
        event.color = 'red';
        break;
      case 'Death':
        event.color = 'grey';
        break;
      case 'Born':
        event.color = 'dodgerblue';
    }
    this.http.post('newEvent', event);
  }
}

interface Event {
  text: string;
  color: string;
  date: Date;
  margin: number;
}
