import { Component, OnInit } from '@angular/core';
import { Album } from '../dash/dash.component';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  public file;
  private album: Album = { img: '', date: new Date(Date.now()) };

  constructor() {}

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

  onSubmit() {}

  ngOnInit() {}
}
