import { Component, OnInit } from '@angular/core';
import { AlbumsService } from '../albums.service';
import { Album } from '../new/new.component';

@Component({
  selector: 'vinyl-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.css']
})
export class RandomComponent implements OnInit {
  private albums: Album[];
  public randAlb: string;
  public loaded = false;
  public width: number;
  public height: number;

  constructor(private albumService: AlbumsService) { }

  ngOnInit() {
    setInterval(() => {
      this.width = window.innerWidth * 0.9;
      this.height = window.innerHeight * 0.7;
    }, 1000);
    this.loaded = false;
  }

  randomAlbum() {
    this.albumService.getAlbums().then(res => {
      this.albums = res;
      this.randAlb = 'small/' + this.albums[this.random(0, this.albums.length)]._id;
      this.loaded = true;
    });
  }

  random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

}
