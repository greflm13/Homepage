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
    // this.loading = false;
    // this.albums.push({ album: 'a', artist: 'a', cover: 'assets/ph.png', date: new Date(Date.now()), lp_count: 1, lps: [] });
    // this.albums.push({ album: 'a', artist: 'a', cover: 'assets/ph.png', date: new Date(Date.now()), lp_count: 1, lps: [] });
    // this.albums.push({ album: 'a', artist: 'a', cover: 'assets/ph.png', date: new Date(Date.now()), lp_count: 1, lps: [] });
    this.http.get('albums').then(res => {
      this.albums = res;
      this.loading = false;
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

  hello(e) {
    console.log(e);
  }

  enter(e) {
    this.hov = true;
    this.hovleft = e.target.x - this.imgWidth() * 0.05 + 'px';
    this.hovtop = e.target.y - this.imgWidth() * 0.05 + 'px';
    this.hovsrc = e.target.src;
  }

  leave(e) {
    this.hov = false;
  }
}
