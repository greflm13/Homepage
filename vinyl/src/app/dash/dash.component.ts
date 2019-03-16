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
  public imgwidth: string;
  public albums: Album[] = [];

  constructor(private http: HttpService) {}

  ngOnInit() {
    this.imgWidth();
    setInterval(() => {
      this.imgWidth()
    }, 100);
    this.http.get('albums').then(res => {
      this.albums = res;
      this.loading = false;
    });
  }

  imgWidth() {if (window.innerWidth > 1200) {
    this.imgwidth = window.innerWidth / 9 + 'px';
  } else if (window.innerWidth > 992) {
    this.imgwidth = window.innerWidth / 8 + 'px';
  } else if (window.innerWidth > 768) {
    this.imgwidth = window.innerWidth / 6 + 'px';
  } else if (window.innerWidth > 576) {
    this.imgwidth = window.innerWidth / 4 + 'px';
  } else {
    this.imgwidth = window.innerWidth / 3 + 'px';
  }}

  hello(el) {
    console.log(el);
  }

  enter(e) {
    console.log(e.target.x);
    console.log(e.target.y);
  }

  leave(e) {
    console.log(e.target.x);
    console.log(e.target.y);
  }
}
