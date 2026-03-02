import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Leaderboard } from "./minesweeper/field";

@Injectable()
export class HttpgetService {
  constructor(private http: HttpClient) {}

  getLeaderboard(): Promise<Leaderboard> {
    return this.http
      .get<Leaderboard>("leaderboard")
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error("Server not rechable. ERROR: " + error);
    return Promise.reject(error.message || error);
  }
}
