import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Leaderboard } from "./minesweeper/field";

@Injectable()
export class HttpputService {
  private headers = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(private http: HttpClient) {}

  putLeaderboard(leaderboard: Leaderboard): Promise<Leaderboard> {
    return this.http
      .post<Leaderboard>("leaderboard", JSON.stringify(leaderboard), {
        headers: this.headers,
      })
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    window.alert("Server nicht erreichbar.");
    return Promise.reject(error.message || error);
  }
}

interface Lo {
  lock: boolean;
}
