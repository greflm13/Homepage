import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Leaderboard } from './minesweeper/field';

@Injectable()
export class HttpgetService {
  constructor(private http: Http) {}

  getLeaderboard(): Promise<Leaderboard> {
    return this.http
      .get('leaderboard')
      .toPromise()
      .then(response => response.json() as Leaderboard)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Server not rechable. ERROR: ' + error);
    return Promise.reject(error.message || error);
  }
}
