import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public msec = window.innerWidth / 3155673600000;
  public events: Event[] = [];
  public line = '101%';

  ngOnInit() {
    console.log(this.msec);
    const date1 = new Date(1900, 1, 1, 0, 0, 0, 0);
    console.log(date1.getTime() + 2206314000000);
    const date2 = new Date(2000, 1, 1, 0, 0, 0, 0);
    console.log(date2.getTime() + 2206314000000);
    setInterval(() => {
      this.msec = window.innerWidth / 3155673600000;
    }, 100);
    this.events.push({
      text: 'Pink Floyd - The Dark Side of the Moon',
      date: new Date(1973, 3, 1),
      color: 'black',
      margin: new Date(1973, 3, 1).getTime() + 2206314000000
    });
    this.events.push({
      text: 'Pink Floyd - Wish You Were Here',
      date: new Date(1975, 9, 12),
      color: 'black',
      margin: new Date(1975, 9, 12).getTime() + 2206314000000
    });
    this.events.push({
      text: 'Queen - Queen',
      date: new Date(1973, 7, 13),
      color: 'orange',
      margin: new Date(1973, 7, 13).getTime() + 2206314000000
    });
    // this.years[73].color = 'yellow';
    // this.years[73].text += ' Pink Floyd - The Dark Side of the Moon';
    // this.years[67].color = 'yellow';
    // this.years[67].text += ' Pink Floyd - The Pioer at the Gates of Dawn';
    // this.years[68].color = 'yellow';
    // this.years[68].text += ' Pink Floyd - A Saucerful of Secrets';
    // this.years[75].color = 'yellow';
    // this.years[75].text += ' Pink Floyd - Wish You Were Here';
    // this.years[77].color = 'yellow';
    // this.years[77].text += ' Pink Floyd - Animals';
    // this.years[79].color = 'yellow';
    // this.years[79].text += ' Pink Floyd - The Wall';

    // this.years[70].color = 'red';
    // this.years[70].text += ' The Beatles - Let It Be';
    // this.years[63].color = 'red';
    // this.years[63].text += ' The Beatles - PLease Please Me';

    // this.years[71].color = 'blue';
    // this.years[71].text += ' Led Zeppelin - Led Zeppelin IV';
    // this.years[69].color = 'blue';
    // this.years[69].text += ' Led Zeppelin - Led Zeppelin I';
    // this.years[69].color = 'blue';
    // this.years[69].text += ' Led Zeppelin - Led Zeppelin II';
    // this.years[70].color = 'blue';
    // this.years[70].text += ' Led Zeppelin - Led Zeppelin III';

    // this.years[73].color = 'green';
    // this.years[73].text += ' Queen - Queen';
    // this.years[74].color = 'green';
    // this.years[74].text += ' Queen - Queen II';
    // this.years[74].color = 'green';
    // this.years[74].text += ' Queen - Sheer Heart Attack';
  }

  click(year: string) {}

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

interface Event {
  text: string;
  color: string;
  date: Date;
  margin: number;
}
