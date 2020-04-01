import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'battleships-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public host = true;

  constructor() { }

  ngOnInit(): void {
  }

  hostJoin(host: boolean) {
    this.host = host;
  }

}
