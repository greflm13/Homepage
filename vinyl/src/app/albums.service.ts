import { Injectable } from '@angular/core';
import { Album } from './new/new.component';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {
  private albums: Album[];

  constructor(private http: HttpService) {}

  getAlbums(): Album[] {
    return this.albums;
  }

  setAlbums(albums: Album[]) {
    this.albums = albums;
  }

  initAlbums(): Promise<Album[]> {
    return this.http.get('albums');
  }
}
