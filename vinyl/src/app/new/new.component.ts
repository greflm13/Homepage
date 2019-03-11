import { Component, OnInit } from '@angular/core';
import { Album } from '../dash/dash.component';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  public file;
  private upFile: File = { filename: '', filetype: '', value: null };
  private album: Album = { img: '', date: new Date(Date.now()) };

  constructor() {}

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        this.upFile.filename = file.name;
        this.upFile.filetype = file.type;
        this.upFile.value = e.target.result;
        this.album.img = file.name;
      };
    }
  }

  onSubmit() {}

  ngOnInit() {}
}

interface File {
  filename: string;
  filetype: string;
  value: any;
}
