import express from "express";
import path from "path";

export let _minecraftRender = express();

_minecraftRender.use(express.static(path.join(__dirname, "minecraft-render/")));
_minecraftRender.get(["/"], (_req, res, _next) => {
  res.sendFile(path.join(__dirname, "minecraft-render/index.html"));
});
_minecraftRender.use(
  "/node_modules",
  express.static(path.join(__dirname, "../node_modules"))
);
