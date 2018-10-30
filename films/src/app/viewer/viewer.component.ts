import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit {
  public path = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const one = this.route.snapshot.paramMap.get('path');
    const two = this.route.snapshot.paramMap.get('subpath');
    const three = this.route.snapshot.paramMap.get('subsubpath');

    this.path = one;
    if (two !== null && two !== '' && two !== undefined) {
      this.path += '/';
      this.path += two;
    }
    if (three !== null && three !== '' && three !== undefined) {
      this.path += '/';
      this.path += three;
    }
  }
}
