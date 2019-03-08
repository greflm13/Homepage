import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {
  public imgwidth = window.innerWidth / 9 + 'px';
  public albums = [];

  constructor() {}

  ngOnInit() {
    setInterval(() => {
      this.imgwidth = window.innerWidth / 9 + 'px';
    }, 100);
    this.albums.push({ img: 'the_wall.png', id: 0 });
    this.albums.push({ img: 'dsotm.png', id: 1 });
    this.albums.push({ img: '1.png', id: 2 });
    this.albums.push({ img: 'animals.png', id: 3 });
    this.albums.push({ img: 'coexist.png', id: 4 });
    this.albums.push({ img: 'this_is_all_yours.png', id: 5 });
    this.albums.push({ img: 'konk.png', id: 6 });
    this.albums.push({ img: 'lateralus.png', id: 7 });
    this.albums.push({ img: 'metallica.png', id: 8 });
    this.albums.push({ img: 'meddle.png', id: 9 });
    this.albums.push({ img: 'let_it_be.png', id: 10 });
  }

  hello(id: number) {
    alert(id);
  }
}

interface Album {
  img: string;
  id: number;
}
