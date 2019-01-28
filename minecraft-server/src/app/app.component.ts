import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  public status: Status = {
    duration: 0,
    error: '',
    favicon: '',
    motd: '',
    last_online: '',
    last_updated: '',
    online: false,
    players: { max: 0, now: 0 },
    server: { name: '', protocol: 0 },
    status: ''
  };

  constructor(private http: HttpService) {}

  ngOnInit() {
    this.http.get('status').then(res => {
      this.status = res;
    });
    setInterval(() => {
      this.http.get('status').then(res => {
        this.status = res;
      });
    }, 10000);
  }
}

interface Status {
  status: string;
  online: boolean;
  motd: string;
  favicon: string;
  error: string;
  players: Players;
  server: Server;
  last_online: string;
  last_updated: string;
  duration: number;
}

interface Players {
  max: number;
  now: number;
}

interface Server {
  name: string;
  protocol: number;
}
