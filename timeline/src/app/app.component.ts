import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public msec = ((window.innerWidth / 100) * 99) / 3155673600000;
  public half = window.innerHeight / 10 + 'px';
  public eventHeight = window.innerHeight / 10 + 'px';
  public lineHeight = window.innerHeight / 50 + 'px';
  public events: Event[] = [];
  public line = (window.innerWidth / 100) * 99 + 'px';
  public name: string;
  public date: string;
  public description: string;
  public type = 'Category';
  public nameWrong = '';
  public typeWrong = '';
  public dateWrong = '';
  public descriptionWrong = '';

  constructor(private http: HttpService) {}

  ngOnInit() {
    setInterval(() => {
      this.msec = ((window.innerWidth / 100) * 99) / 3155673600000;
      this.half = window.innerHeight / 10 + 'px';
      this.eventHeight = window.innerHeight / 10 + 'px';
      this.lineHeight = window.innerHeight / 50 + 'px';
      this.line = (window.innerWidth / 100) * 99 + 'px';
    }, 100);
    this.http.get('events').then(res => {
      this.events = res;
    });
  }

  enter(index: number) {
    this.events[index].open = true;
  }

  leave(index: number) {
    this.events[index].open = false;
  }

  newEvent() {
    if (this.name === '' || this.name === undefined || this.name === null) {
      this.nameWrong = 'red 3px solid';
    } else {
      this.nameWrong = '';
    }
    if (this.description === '' || this.description === undefined || this.description === null) {
      this.descriptionWrong = 'red 3px solid';
    } else {
      this.descriptionWrong = '';
    }
    if (this.type === '' || this.type === undefined || this.type === null || this.type === 'Category') {
      this.typeWrong = 'red 3px solid';
    } else {
      this.typeWrong = '';
    }
    if (this.date === '' || this.date === undefined || this.date === null) {
      this.dateWrong = 'red 3px solid';
    } else {
      this.dateWrong = '';
    }
    if (this.nameWrong === '' && this.typeWrong === '' && this.dateWrong === '' && this.descriptionWrong === '') {
      const event: Event = {
        text: this.name,
        date: new Date(this.date).toLocaleDateString(),
        margin: new Date(this.date).getTime() + 2206314000000,
        color: '',
        open: false,
        description: this.description
      };
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
      this.name = '';
      this.type = 'Category';
      this.date = '';
      this.description = '';
      this.http.post('newEvent', event).then(res => {
        this.events = res;
      });
    }
  }
}

interface Event {
  text: string;
  description: string;
  color: string;
  date: string;
  margin: number;
  open: boolean;
}
