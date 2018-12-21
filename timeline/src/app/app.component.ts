import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public width = (window.innerWidth * 0.99) / 101 + 'px';
  public years = [];
  public line = '99%';

  ngOnInit() {
    setInterval(() => {
      this.width = (window.innerWidth * 0.99) / 101 + 'px';
    }, 100);
    for (let i = 0; i <= 100; i++) {
      if (i < 10) {
        this.years.push({ color: this.decimalToHexString(i), text: '190' + i });
      } else if (i > 99) {
        this.years.push({ color: this.decimalToHexString(i), text: '2000' });
      } else {
        this.years.push({ color: this.decimalToHexString(i), text: '19' + i });
      }
    }
    let date0 = new Date(1970, 0, 1).valueOf();
    let date1 = new Date(1970, 0, 2).valueOf();

    console.log(date0);
    console.log(date1);
  }

  decimalToHexString(number: number): string {
    if (number < 0) {
      number = 0xffffffff + number + 1;
    }
    let result = number.toString(16).toUpperCase();
    if (result.length < 6) {
      result += '0';
      if (result.length < 6) {
        result += '0';
        if (result.length < 6) {
          result += '0';
          if (result.length < 6) {
            result += '0';
            if (result.length < 6) {
              result += '0';
              if (result.length < 6) {
                result += '0';
              }
            }
          }
        }
      }
    }
    return '#' + result;
  }
}
