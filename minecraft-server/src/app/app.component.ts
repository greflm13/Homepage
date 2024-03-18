import { Component, OnInit } from "@angular/core";
import { HttpService } from "./http.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
  public minecraft: Status = {
    icon: "",
    motd: { raw: "", clean: "", html: "" },
    online: false,
    players: { max: 0, online: 0, list: [] },
    version: { name_raw: "", name_clean: "", name_html: "", protocol: 0 },
    eula_blocked: false,
    expires_at: 0,
    retrieved_at: 0,
    host: "minecraft.sorogon.eu",
    ip_address: "",
    mods: [],
    port: 25567,
    plugins: [],
    software: null,
    srv_record: { host: "sorogon.eu", port: 25567 },
  };
  public neuland: Status = {
    icon: "",
    motd: { raw: "", clean: "", html: "" },
    online: false,
    players: { max: 0, online: 0, list: [] },
    version: { name_raw: "", name_clean: "", name_html: "", protocol: 0 },
    eula_blocked: false,
    expires_at: 0,
    retrieved_at: 0,
    host: "neuland.sorogon.eu",
    ip_address: "",
    mods: [],
    port: 25566,
    plugins: [],
    software: null,
    srv_record: { host: "sorogon.eu", port: 25566 },
  };

  constructor(private http: HttpService) {}

  ngOnInit() {
    this.http.get("status/minecraft").then((res) => {
      this.minecraft = res;
    });
    setInterval(() => {
      this.http.get("status/minecraft").then((res) => {
        this.minecraft = res;
      });
    }, 10000);
    this.http.get("status/neuland").then((res) => {
      this.neuland = res;
    });
    setInterval(() => {
      this.http.get("status/neuland").then((res) => {
        this.neuland = res;
      });
    }, 10000);
  }
}

interface Status {
  online: boolean;
  host: string;
  port: number;
  ip_address: string;
  eula_blocked: boolean;
  retrieved_at: number;
  expires_at: number;
  srv_record: SrvRecord;
  version: Version;
  players: Players;
  motd: Motd;
  icon: string;
  mods: any[];
  software: any;
  plugins: any[];
}

interface SrvRecord {
  host: string;
  port: number;
}

interface Version {
  name_raw: string;
  name_clean: string;
  name_html: string;
  protocol: number;
}

interface Players {
  online: number;
  max: number;
  list: any[];
}

interface Motd {
  raw: string;
  clean: string;
  html: string;
}
