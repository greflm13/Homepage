import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Album } from '../new/new.component';
import { AlbumsService } from '../albums.service';
import { HttpService } from '../http.service';

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

  constructor(private albumService: AlbumsService, private router: Router) {}

  ngOnInit() {
    this.imgwidth = this.imgWidth() + 'px';
    this.hovwidth = this.imgWidth() * 1.1 + 'px';
    setInterval(() => {
      this.imgwidth = this.imgWidth() + 'px';
      this.hovwidth = this.imgWidth() * 1.1 + 'px';
    }, 100);
    this.albumService.getAlbums().then(res => {
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

  click(id: any) {
    this.router.navigateByUrl('/detail/' + id);
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
}
