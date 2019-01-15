import { Component, OnInit, HostListener } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public windowWidth = window.innerWidth;
  public windowHeight = window.innerHeight;
  public msec = ((this.windowWidth / 100) * 99) / 3155673600000;
  public half = this.windowHeight / 10 + 'px';
  public eventHeight = this.windowHeight / 10 + 'px';
  public eventWidth = (this.windowWidth / 1000) * 3;
  public lineHeight = this.windowHeight / 50 + 'px';
  public events: Event[] = [];
  public line = (this.windowWidth / 100) * 99;
  public name: string;
  public date: string;
  public description: string;
  public type = 'Category';
  public nameWrong = '';
  public typeWrong = '';
  public dateWrong = '';
  public descriptionWrong = '';
  public left = false;
  private zoom = 0;

  constructor(private http: HttpService) {}

  @HostListener('wheel', ['$event'])
  Wheel(event: WheelEvent) {
    if (event.deltaY < 0) {
      this.zoom++;
    }
    if (event.deltaY > 0) {
      this.zoom--;
    }
  }

  ngOnInit() {
    setInterval(() => {
      this.windowWidth = window.innerWidth * Math.pow(1.1, this.zoom);
      this.msec = ((this.windowWidth / 100) * 99) / 3155673600000;
      this.half = this.windowHeight / 10 + 'px';
      this.eventHeight = this.windowHeight / 10 + 'px';
      this.lineHeight = this.windowHeight / 50 + 'px';
      this.line = (this.windowWidth / 100) * 99;
      this.eventWidth = (window.innerWidth / 1000) * 3;
    }, 100);
    this.http.get('events').then(res => {
      this.events = res;
    });
  }

  enter(index: number) {
    if (this.windowWidth - this.events[index].margin * this.msec > this.eventWidth * 50) {
      this.left = false;
    } else {
      this.left = true;
    }
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
          break;
        case 'Film':
          event.color = 'violet';
          break;
        default:
          event.color = 'lightgrey';
          break;
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
