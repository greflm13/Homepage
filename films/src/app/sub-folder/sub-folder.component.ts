import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sub-folder',
  templateUrl: './sub-folder.component.html',
  styleUrls: ['./sub-folder.component.css']
})
export class SubFolderComponent implements OnInit {
  public current = '';
  public currenter = '';
  public folders = [];

  constructor(private http: HttpService, private route: ActivatedRoute, private location: Location) {}

  ngOnInit() {
    this.current = this.route.snapshot.paramMap.get('folder');
    this.currenter = this.route.snapshot.paramMap.get('subfolder');
    this.http.get('list/' + this.current + '/' + this.currenter).then(res => {
      this.folders = res;
    });
  }
}
