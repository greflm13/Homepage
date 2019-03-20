import { Component, OnInit } from '@angular/core';
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
  public album: Album = { album: null, artist: null, cover: null, date: null, lp_count: null, lps: null, release: null };
  public loading = true;
  public imgwidth = window.innerWidth/9+'px';

  constructor(private route: ActivatedRoute, private location: Location, private albumService: AlbumsService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('album');
    if (this.albumService.getAlbums() !== undefined) {
      this.albumService.getAlbums().forEach(album => {
        if (album._id === id) {
          this.album = album;
          this.loading = false;
          console.log(album);
        }
      });
    } else {
      this.albumService.initAlbums().then(res => {
        res.forEach(album => {
          if (album._id === id) {
            this.album = album;
            this.loading = false;
            console.log(album);
          }
        });
      });
    }
  }
}
