import express from "express";
import path from "path";
import fs from "fs";
import cookie from "cookie";

export let _chat = express();

const Users: User[] = [];
const Timeouts: Out[] = [];
let Chat: Message[] = [];
try {
  Chat = JSON.parse(
    fs.readFileSync(path.join(__dirname, "./chat.json")).toString()
  );
} catch {
  Chat = [];
}

_chat.post("/new", (req, res, next) => newUser(req, res, next));
_chat.post("/chat", (req, res, next) => newMessage(req, res, next));
_chat.get("/users", (req, res, next) => returnUsers(req, res, next));
_chat.get("/delete/:data", (req, res, next) => deleteUser(req, res, next));
_chat.get("/chat", (req, res, next) => chat(req, res, next));
_chat.use(express.static(path.join(__dirname, "chat/")));
_chat.get(["/", "/chatWindow", "/m"], (_req, res, _next) => {
  res.sendFile(path.join(__dirname, "chat/index.html"));
});
_chat.use(
  "/node_modules",
  express.static(path.join(__dirname, "../node_modules"))
);

function chat(
  _req: express.Request,
  res: express.Response,
  _next: express.NextFunction
) {
  res.send(Chat);
}

function newMessage(
  req: express.Request,
  res: express.Response,
  _next: express.NextFunction
) {
  Chat.push(req.body.message);
  if (Chat.length > 200) {
    Chat.splice(0, 1);
  }

  for (let i = 0; i < Timeouts.length; i++) {
    if (req.body.user.id === Timeouts[i].id) {
      clearTimeout(Timeouts[i].out);
    }
  }
  fs.writeFileSync(path.join(__dirname, "./chat.json"), JSON.stringify(Chat));
  res.send(Users);
}

function returnUsers(
  req: express.Request,
  res: express.Response,
  _next: express.NextFunction
) {
  if (
    req.cookies.user === undefined ||
    req.cookies.user === "" ||
    req.cookies.user === null
  ) {
    res.sendStatus(403);
  } else {
    let match = 0;
    Users.forEach((user) => {
      if (user.id === JSON.parse(req.cookies.user).id) {
        match++;
      }
    });
    if (match === 0) {
      Users.push(JSON.parse(req.cookies.user));
    }
    for (let i = 0; i < Timeouts.length; i++) {
      if (JSON.parse(req.cookies.user).id === Timeouts[i].id) {
        clearTimeout(Timeouts[i].out);
      }
    }
    Timeouts.push({
      out: setTimeout(() => {
        for (let i = 0; i < Users.length; i++) {
          if (JSON.parse(req.cookies.user).id === Users[i].id) {
            Users.splice(i, 1);
          }
        }
      }, 1000),
      id: JSON.parse(req.cookies.user).id,
    });
    res.send(Users);
  }
}

function deleteUser(
  req: express.Request,
  _res: express.Response,
  _next: express.NextFunction
) {
  for (let i = 0; i < Users.length; i++) {
    if (req.params.data === Users[i].id) {
      Users.splice(i, 1);
    }
  }
}

function newUser(
  req: express.Request,
  res: express.Response,
  _next: express.NextFunction
) {
  if (
    req.cookies.user === undefined ||
    req.cookies.user === "" ||
    req.cookies.user === null
  ) {
    let exists = false;
    let id = "";
    const iat = Date.now() + 3600000;
    do {
      const possible = "0123456789";

      for (let i = 0; i < 16; i++) {
        id += possible.charAt(Math.floor(Math.random() * possible.length));
      }

      for (let i = 0; i < Users.length; i++) {
        if (Users[i].id === id) {
          exists = true;
          id = "";
        }
      }
    } while (exists);
    Users.push({
      name: req.body.name,
      id: id,
      iat: iat,
      color: req.body.color,
    });
    res.setHeader(
      "Set-Cookie",
      cookie.serialize(
        "user",
        JSON.stringify({
          name: req.body.name,
          id: id,
          color: req.body.color,
          iat: iat,
        }),
        {
          maxAge: 60 * 60 * 24 * 365, // 1 Year
        }
      )
    );
    res.send({ name: req.body.name, color: req.body.color, id: id, iat: iat });
  } else {
    res.send(JSON.parse(decodeURIComponent(req.cookies.user)));
  }
}

interface User {
  name: string;
  id: string;
  iat: number;
  color: string;
}

interface Out {
  out: any;
  id: string;
}

interface Message {
  user: string;
  time: Date;
  color: string;
  text: string;
}
