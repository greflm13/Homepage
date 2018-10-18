import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private innerWidth: number;
  constructor(private router: Router) {}

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 768) {
      this.router.navigateByUrl('/m');
    }
    if (this.innerWidth >= 768) {
      this.router.navigateByUrl('/');
    }
  }
}
