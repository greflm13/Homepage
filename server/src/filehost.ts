import express from "express";
import path from "path";
import serveStatic from "serve-static";
import util from "util";
const exec = util.promisify(require("child_process").exec);

export let _filehost = express();

_filehost.get("**", (req, res, next) => refresh(req, res, next));
// _filehost.use(express.static(path.join(__dirname, 'filehost/')));
_filehost.use(
  serveStatic(path.join(__dirname, "filehost/"), {
    index: ["index.html", "index.htm"],
  })
);
_filehost.use(
  "/node_modules",
  express.static(path.join(__dirname, "../node_modules"))
);

async function refresh(
  req: express.Request,
  _res: express.Response,
  next: express.NextFunction
) {
  if (req.path.endsWith("/")) {
    await exec(path.join(__dirname, "filehost/refresh_filelist ") + req.path);
  }
  next();
}
