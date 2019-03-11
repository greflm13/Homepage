import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {
  public imgwidth: string;
  public albums = [];

  constructor() {}

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
    this.albums.push({ hover: false, img: 'the_wall.png', id: 0 });
    this.albums.push({ hover: false, img: 'dsotm.png', id: 1 });
    this.albums.push({ hover: false, img: '1.png', id: 2 });
    this.albums.push({ hover: false, img: 'animals.png', id: 3 });
    this.albums.push({ hover: false, img: 'coexist.png', id: 4 });
    this.albums.push({ hover: false, img: 'this_is_all_yours.png', id: 5 });
    this.albums.push({ hover: false, img: 'konk.png', id: 6 });
    this.albums.push({ hover: false, img: 'lateralus.png', id: 7 });
    this.albums.push({ hover: false, img: 'metallica.png', id: 8 });
    this.albums.push({ hover: false, img: 'meddle.png', id: 9 });
    this.albums.push({ hover: false, img: 'let_it_be.png', id: 10 });
    this.albums.push({ hover: false, img: 'i_see_you.png', id: 11 });
    this.albums.push({ hover: false, img: 'undertow.png', id: 12 });
    this.albums.push({ hover: false, img: 'master_of_puppets.png', id: 13 });
    this.albums.push({ hover: false, img: 'kind_of_blue.png', id: 14 });
    this.albums.push({ hover: false, img: 'a_night_at_the_opera.png', id: 15 });
    this.albums.push({ hover: false, img: 'obscured_by_clouds.png', id: 16 });
    this.albums.push({ hover: false, img: 'wish_you_were_here.png', id: 17 });
    this.albums.push({ hover: false, img: 'keeper_1.png', id: 18 });
    this.albums.push({ hover: false, img: 'keeper_2.png', id: 19 });
    this.albums.push({ hover: false, img: 'play.png', id: 20 });
    this.albums.push({ hover: false, img: 'led_zeppelin_1.png', id: 21 });
    this.albums.push({ hover: false, img: 'led_zeppelin_4.png', id: 22 });
    this.albums.push({ hover: false, img: 'nevermind.png', id: 23 });
    this.albums.push({ hover: false, img: 'physical_graffiti.png', id: 24 });
    this.albums.push({ hover: false, img: 'metal_opera.png', id: 25 });
    this.albums.push({ hover: false, img: 'appetite_for_destruction.png', id: 26 });
    this.albums.push({ hover: false, img: 'christmas.png', id: 27 });
    this.albums.push({ hover: false, img: 'truth_is_a_beautiful_thing.png', id: 28 });
    this.albums.push({ hover: false, img: 'ram.png', id: 29 });
    this.albums.push({ hover: false, img: 'lost_in_space.png', id: 30 });
    this.albums.push({ hover: false, img: 'trilogy.png', id: 31 });
    this.albums.push({ hover: false, img: 'out_of_time.png', id: 32 });
    this.albums.push({ hover: false, img: '810.png', id: 33 });
    this.albums.push({ hover: false, img: 'minecraft_1.png', id: 34 });
    this.albums.push({ hover: false, img: 'far_cry_3.png', id: 35 });
    this.albums.push({ hover: false, img: 'lotr1.png', id: 36 });
    this.albums.push({ hover: false, img: 'lotr2.png', id: 37 });
    this.albums.push({ hover: false, img: 'lotr3.png', id: 38 });
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
