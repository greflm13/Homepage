import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Leaderboard } from './minesweeper/field';

@Injectable()
export class HttpputService {
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) {}

  putLeaderboard(leaderboard: Leaderboard): Promise<Leaderboard> {
    return this.http
      .post('leaderboard', JSON.stringify(leaderboard), {
        headers: this.headers
      })
      .toPromise()
      .then(res => res.json() as Leaderboard)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    window.alert('Server nicht erreichbar.');
    return Promise.reject(error.message || error);
  }
}

interface Lo {
  lock: boolean;
}
