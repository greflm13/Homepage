import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
    selector: 'vinyl-new',
    templateUrl: './new.component.html',
    styleUrls: ['./new.component.css'],
    standalone: false
})
export class NewComponent implements OnInit {
  public date;
  public release;
  public cover: string;
  public imgwidth: string;
  public album: Album = {
    artist: '',
    album: '',
    cover: '',
    date: new Date(Date.now()),
    release: new Date(Date.now()),
    lp_count: 1,
    lps: [{ sides: [{ song_count: 1, songs: [''] }, { song_count: 1, songs: [''] }] }]
  };

  constructor(private http: HttpService, private router: Router) {}

  onFileChange(event, lp: number, side: number) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        if (lp === 0) {
          this.album.cover = e.target.result;
        } else {
          // this.album.lps[lp - 1].sides[side].picture = e.target.result;
        }
      };
    }
  }

  onLpNrChange() {
    const temp = this.album.lps;
    this.album.lps = [];
    for (let i = 0; i < this.album.lp_count; i++) {
      if (temp[i]) {
        this.album.lps.push(temp[i]);
      } else {
        this.album.lps.push({ sides: [{ song_count: 1, songs: [''] }, { song_count: 1, songs: [''] }] });
      }
    }
  }

  onSongNrChange(lp: number, side: number) {
    const temp = this.album.lps[lp].sides[side].songs;
    this.album.lps[lp].sides[side].songs = [];
    for (let i = 0; i < this.album.lps[lp].sides[side].song_count; i++) {
      if (temp[i]) {
        this.album.lps[lp].sides[side].songs.push(temp[i]);
      } else {
        this.album.lps[lp].sides[side].songs.push('');
      }
    }
  }
  onSubmit() {
    this.album.date = this.date;
    this.album.release = this.release;
    // console.log(this.album);
    this.http.post('album', this.album).then(() => {
      this.router.navigate(['/']);
    });
  }

  trackByFn(index: any, item: any) {
    return index;
  }

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
  }
}

export interface Album {
  artist: string;
  album: string;
  cover: string;
  lp_count: number;
  lps: Lp[];
  release: Date;
  date: Date;
  _id?: any;
}

interface Lp {
  sides: Side[];
}

interface Side {
  // picture: string;
  songs: string[];
  song_count: number;
}
