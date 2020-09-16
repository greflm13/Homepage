import { Injectable } from '@angular/core';
import { Album } from './new/new.component';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {
  private albums: Album[] = [];

  constructor(private http: HttpService) { }

  async getAlbums(): Promise<Album[]> {
    if (this.albums.length === 0) {
      await this.initAlbums();
    }
    return new Promise((resolve, reject) => {
      resolve(this.albums);
    });
  }

  async initAlbums() {
    await this.http
      .get('albums')
      .then(res => {
        this.albums = res;
        this.albums.sort(
          (leftSide, rightSide): number => {
            if (leftSide.artist.toLowerCase() > rightSide.artist.toLowerCase()) {
              return 1;
            }
            if (leftSide.artist.toLowerCase() < rightSide.artist.toLowerCase()) {
              return -1;
            }
            if (leftSide.release > rightSide.release) {
              return 1;
            }
            if (leftSide.release < rightSide.release) {
              return -1;
            }
            if (leftSide.album.toLowerCase() > rightSide.album.toLowerCase()) {
              return 1;
            }
            if (leftSide.album.toLowerCase() < rightSide.album.toLowerCase()) {
              return -1;
            }
            return 0;
          }
        );
      })
      .catch(() => {
        this.mockData();
      });
  }

  mockData() {
    for (let i = 0; i < 63; i++) {
      this.albums.push({
        album: '#' + i,
        artist: '#' + i,
        cover: 'assets/placeholder.png',
        date: new Date(Date.now()),
        release: new Date(Date.now()),
        lp_count: 3,
        lps: [
          {
            sides: [{
              song_count: 6, songs: [
                'Songy songiness',
                'Songy songiness',
                'Songy songiness',
                'Songy songiness',
                'Songy songiness',
                'Songy songiness'
              ]
            },
            {
              song_count: 5, songs: [
                'Songy songiness',
                'Songy songiness',
                'Songy songiness',
                'Songy songiness',
                'Songy songiness'
              ]
            }]
          }, {
            sides: [{
              song_count: 6, songs: [
                'Songy songiness',
                'Songy songiness',
                'Songy songiness',
                'Songy songiness',
                'Songy songiness',
                'Songy songiness'
              ]
            },
            {
              song_count: 5, songs: [
                'Songy songiness',
                'Songy songiness',
                'Songy songiness',
                'Songy songiness',
                'Songy songiness'
              ]
            }]
          }, {
            sides: [{
              song_count: 6, songs: [
                'Songy songiness',
                'Songy songiness',
                'Songy songiness',
                'Songy songiness',
                'Songy songiness',
                'Songy songiness'
              ]
            },
            {
              song_count: 5, songs: [
                'Songy songiness',
                'Songy songiness',
                'Songy songiness',
                'Songy songiness',
                'Songy songiness'
              ]
            }]
          }
        ],
        _id: '' + i
      });
    }
  }
}
