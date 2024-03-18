import express from "express";
import path from "path";
import https from "https";
import { log } from "./server";

export let _minecraftServer = express();

_minecraftServer.use(express.static(path.join(__dirname, "minecraft-server/")));
_minecraftServer.get(["/"], (_req, res, _next) => {
  res.sendFile(path.join(__dirname, "minecraft-server/index.html"));
});
_minecraftServer.get("/status/:data", (req, res, next) =>
  status(req, res, next)
);
_minecraftServer.use(
  "/node_modules",
  express.static(path.join(__dirname, "../node_modules"))
);

function status(
  req: express.Request,
  res: express.Response,
  _next: express.NextFunction
) {
  https
    .get(
      {
        port: 443,
        host: "api.mcstatus.io",
        path: "/v2/status/java/" + req.params.data + ".sorogon.eu",
      },
      (resp) => {
        let data = "";

        resp.on("data", (chunk) => {
          data += chunk;
        });

        resp.on("end", () => {
          try {
            let resjson: ServerInfo = JSON.parse(data);
            let sendback = {
              duration: 0,
              error: "",
              favicon: resjson.icon,
              motd: resjson.motd.clean,
              last_online: "",
              last_updated: "",
              online: resjson.online,
              players: {
                max: resjson.players.max,
                now: resjson.players.online,
              },
              server: { name: resjson.version.name_clean, protocol: resjson.version.protocol },
              status: "success",
            };
            res.json(sendback);
          } catch (err) {
            log.warn(err);
          }
        });
      }
    )
    .on("error", (err) => {
      log.warn(err);
    });
}

interface ServerInfo {
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
