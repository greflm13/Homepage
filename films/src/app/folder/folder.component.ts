import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})
export class FolderComponent implements OnInit {
  public current = '';
  public folders = [];

  constructor(private http: HttpService, private route: ActivatedRoute, private location: Location) {}

  ngOnInit() {
    this.current = this.route.snapshot.paramMap.get('folder');
    this.http.get('list/' + this.current).then(res => {
      this.folders = res;
    });
  }
}
