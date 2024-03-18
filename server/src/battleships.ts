import express from "express";
import path from "path";

export let _battleships = express();

_battleships.use(express.static(path.join(__dirname, "battleships/")));
_battleships.get(["/", "/game"], (_req, res, _next) => {
  res.sendFile(path.join(__dirname, "battleships/index.html"));
});
_battleships.use(
  "/node_modules",
  express.static(path.join(__dirname, "../node_modules"))
);
