import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Album } from '../new/new.component';
import { AlbumsService } from '../albums.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  @ViewChild('detail') elementView: ElementRef;

  public album: Album = { album: null, artist: null, cover: null, date: null, lp_count: null, lps: null, release: null };
  public loading = true;
  public bgheight: string;
  public imgwidth: string;
  public lpwidth: string;

  constructor(private route: ActivatedRoute, private location: Location, private albumService: AlbumsService) {}

  ngOnInit() {
    this.imgwidth = this.imgWidth() + 'px';
    this.lpwidth = this.lpWidth() + 'px';
    setInterval(() => {
      this.lpwidth = this.lpWidth() + 'px';
    }, 200);
    const id = this.route.snapshot.paramMap.get('album');
    this.albumService.getAlbums().then(res => {
      res.forEach(album => {
        if (album._id === id) {
          this.album = album;
          this.loading = false;
          this.bgheight = this.elementView.nativeElement.offsetHeight * 1.2 + 'px';
          console.log(this.bgheight);
        }
      });
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

  lpWidth(): number {
    if (window.innerWidth > 1200) {
      return window.innerWidth / 2.1;
    } else if (window.innerWidth > 992) {
      return window.innerWidth / 2.1;
    } else if (window.innerWidth > 768) {
      return window.innerWidth / 2.1;
    } else if (window.innerWidth > 576) {
      return window.innerWidth;
    } else {
      return window.innerWidth;
    }
  }
}
