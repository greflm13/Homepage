import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

import { Album } from '../new/new.component';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {
  public loading = true;
  public hov = false;
  public imgwidth: string;
  public hovwidth: string;
  public hovtop: string;
  public hovleft: string;
  public hovsrc: string;
  public albums: Album[] = [];

  constructor(private http: HttpService) {}

  ngOnInit() {
    this.imgwidth = this.imgWidth() + 'px';
    this.hovwidth = this.imgWidth() * 1.1 + 'px';
    setInterval(() => {
      this.imgwidth = this.imgWidth() + 'px';
      this.hovwidth = this.imgWidth() * 1.1 + 'px';
    }, 100);
    this.http
      .get('albums')
      .then(res => {
        this.albums = res;
        this.sort();
        this.loading = false;
      })
      .catch(() => {
        this.mockData();
      });
  }

  imgWidth(): number {
    if (window.innerWidth > 1200) {
      return window.innerWidth / 9;
    } else if (window.innerWidth > 992) {
      return window.innerWidth / 8;
    } else if (window.innerWidth > 768) {
      return window.innerWidth / 6;
    } else if (window.innerWidth > 576) {
      return window.innerWidth / 4;
    } else {
      return window.innerWidth / 3;
    }
  }

  hello(e: Event) {
    console.log(e);
  }

  enter(e: any) {
    const target = e.target || e.srcElement;
    this.hov = true;
    this.hovleft = window.pageXOffset + target.getBoundingClientRect().left - this.imgWidth() * 0.05 + 'px';
    this.hovtop = window.pageYOffset + target.getBoundingClientRect().top - this.imgWidth() * 0.05 + 'px';
    this.hovsrc = target.src;
  }

  leave(e: Event) {
    this.hov = false;
  }

  sort() {
    this.albums.sort(
      (leftSide, rightSide): number => {
        if (leftSide.artist > rightSide.artist) {
          return 1;
        }
        if (leftSide.artist < rightSide.artist) {
          return -1;
        }
        if (leftSide.release > rightSide.release) {
          return 1;
        }
        if (leftSide.release < rightSide.release) {
          return -1;
        }
        return 0;
      }
    );
  }

  mockData() {
    this.loading = false;
    for (let i = 0; i < 60; i++) {
      this.albums.push({
        album: 'a',
        artist: 'a',
        cover: 'assets/ph.png',
        date: new Date(Date.now()),
        release: new Date(Date.now()),
        lp_count: 1,
        lps: []
      });
    }
  }
}
