import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Album } from '../dash/dash.component';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  public file;
  public date;
  public album: Album = { img: '', date: new Date(Date.now()) };
  public imgwidth: string;

  constructor(private http: HttpService, private router: Router) {}

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        this.album.img = e.target.result;
      };
    }
  }

  onSubmit() {
    if (this.date && this.file) {
      this.album.date = this.date;
      this.http.post('album', this.album).then(() => {
        this.router.navigate(['/']);
      });
    }
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
