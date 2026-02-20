import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Album } from '../new/new.component';
import { AlbumsService } from '../albums.service';

@Component({
  selector: 'vinyl-small',
  templateUrl: './small.component.html',
  styleUrls: ['./small.component.css']
})
export class SmallComponent implements OnInit {
  @ViewChild('detail') elementView: ElementRef;

  public album: Album = { album: null, artist: null, cover: null, date: null, lp_count: null, lps: null, release: null, _id: 0 };
  public loading = true;
  public bgheight: string;
  public imgwidth: string;
  public lpwidth: string;
  public textColor: string;
  public nLPs: number;
  public nSongs = 0;

  constructor(private route: ActivatedRoute, private location: Location, private albumService: AlbumsService) { }

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
          this.nLPs = this.album.lp_count;
          this.album.lps.forEach(lp => {
            lp.sides.forEach(side => {
              this.nSongs += side.song_count;
            })
          })
          this.getImageLightness(album.cover, (brightness: number) => {
            if (brightness > 80) {
              this.textColor = 'black';
            } else {
              this.textColor = 'white';
            }
          });
          setInterval(() => {
            const elheight = this.elementView.nativeElement.offsetHeight + 20;
            const height = window.innerHeight;
            if (elheight > height) {
              this.bgheight = elheight + 'px';
            } else {
              this.bgheight = height + 'px';
            }
          }, 100);
          this.loading = false;
        }
      });
    });
  }

  imgWidth(): number {
    if (window.screen.width > 1200) {
      return window.screen.width / 9;
    } else if (window.screen.width > 992) {
      return window.screen.width / 8;
    } else if (window.screen.width > 768) {
      return window.screen.width / 6;
    } else if (window.screen.width > 576) {
      return window.screen.width / 4;
    } else {
      return window.screen.width / 3;
    }
  }

  lpWidth(): number {
    if (window.screen.width > 1200) {
      return window.screen.width / 2.1;
    } else if (window.screen.width > 992) {
      return window.screen.width / 2.1;
    } else if (window.screen.width > 768) {
      return window.screen.width / 2.1;
    } else if (window.screen.width > 576) {
      return window.screen.width;
    } else {
      return window.screen.width;
    }
  }


  getImageLightness(imageSrc: string, callback: (arg0: number) => void) {
    const img = document.createElement('img');
    img.src = imageSrc;
    img.style.display = 'none';
    document.body.appendChild(img);

    let colorSum = 0;

    img.onload = () => {
      // create canvas
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      let r: number;
      let g: number;
      let b: number;
      let avg: number;

      for (let x = 0, len = data.length; x < len; x += 4) {
        r = data[x];
        g = data[x + 1];
        b = data[x + 2];

        avg = Math.floor((r + g + b) / 3);
        colorSum += avg;
      }

      const brightness = Math.floor(colorSum / (img.width * img.height));
      callback(brightness);
    };
  }
}
