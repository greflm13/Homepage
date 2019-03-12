import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {
  public imgwidth: string;
  public albums = [];

  constructor(private http: HttpService) {}

  ngOnInit() {
    setInterval(() => {
      if (window.innerWidth > 1200) {
        this.imgwidth = window.innerWidth / 9 + 'px';
      } else if (window.innerWidth > 992) {
        this.imgwidth = window.innerWidth / 8 + 'px';
      } else if (window.innerWidth > 768) {
        this.imgwidth = window.innerWidth / 6 + 'px';
      } else if (window.innerWidth > 576) {
        this.imgwidth = window.innerWidth / 4 + 'px';
      } else {
        this.imgwidth = window.innerWidth / 3 + 'px';
      }
    }, 100);
    this.http.get('albums').then((res) => {
      this.albums = res;
    });
  }

  hello(id: number) {
    console.log('click : ' + id);
  }

  enter(id: number) {
    this.albums.forEach(album => {
      if (album.id === id) {
        album.hover = true;
      }
    });
  }

  leave(id: number) {
    this.albums.forEach(album => {
      if (album.id === id) {
        album.hover = false;
      }
    });
  }
}

export interface Album {
  img: string;
  date: Date;
}
