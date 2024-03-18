import express from "express";
import path from "path";
import { DB } from "./db";

export let _timeline = express();

_timeline.use(express.static(path.join(__dirname, "timeline/")));
_timeline.get(["/"], (_req, res, _next) => {
  res.sendFile(path.join(__dirname, "timeline/index.html"));
});
_timeline.get("/events", (req, res, next) => getEvents(req, res, next));
_timeline.post("/newEvent", (req, res, next) => postEvent(req, res, next));
_timeline.use(
  "/node_modules",
  express.static(path.join(__dirname, "../node_modules"))
);

async function getEvents(
  _req: express.Request,
  res: express.Response,
  _next: express.NextFunction
) {
  const events = await DB.Instance.getEvents();
  res.send(events);
}

async function postEvent(
  req: express.Request,
  res: express.Response,
  _next: express.NextFunction
) {
  await DB.Instance.putEvent(req.body);
  await setTimeout(() => {}, 10);
  const events = await DB.Instance.getEvents();
  res.send(events);
}
