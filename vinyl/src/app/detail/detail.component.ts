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
  public textColor: string;

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
          this.loading = false;
          this.getImageLightness(album.cover, (brightness: number) => {
            if (brightness > 150) {
              this.textColor = 'rgb(24, 24, 24)';
            } else if (brightness < 80) {
              this.textColor = 'rgb(224, 224, 224)';
            } else {
              this.textColor = 'rgb(174, 174, 174)';
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


  getImageLightness(imageSrc: string, callback: (arg0: number) => void) {
    const img = document.createElement('img');
    img.src = imageSrc;
    img.style.display = 'none';
    document.body.appendChild(img);

    let colorSum = 0;

    img.onload = function () {
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
