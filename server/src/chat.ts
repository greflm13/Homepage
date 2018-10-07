import * as express from 'express';
import * as path from 'path';
import * as fs from 'fs';
import * as cookie from 'cookie';

export let _chat = express();

export class Chat {
  private Users: User[] = [];
  private Timeouts: Out[] = [];
  private Chat: Message[] = JSON.parse(fs.readFileSync(path.join(__dirname, '../chat.json')).toString());

  constructor() {
    _chat.post('/new', (req, res, next) => this.newUser(req, res, next));
    _chat.post('/chat', (req, res, next) => this.newMessage(req, res, next));
    _chat.get('/users', (req, res, next) => this.returnUsers(req, res, next));
    _chat.get('/delete/:data', (req, res, next) => this.deleteUser(req, res, next));
    _chat.get('/chat', (req, res, next) => this.chat(req, res, next));
  }

  private chat(req: express.Request, res: express.Response, next: express.NextFunction) {
    res.send(this.Chat);
  }

  private newMessage(req: express.Request, res: express.Response, next: express.NextFunction) {
    this.Chat.push(req.body.message);
    if (this.Chat.length > 200) {
      this.Chat.splice(0, 1);
    }

    for (let i = 0; i < this.Timeouts.length; i++) {
      if (req.body.user.id === this.Timeouts[i].id) {
        clearTimeout(this.Timeouts[i].out);
      }
    }
    fs.writeFileSync(path.join(__dirname, '../chat.json'), JSON.stringify(this.Chat));
    res.send(this.Users);
  }

  private returnUsers(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req.cookies.user === undefined || req.cookies.user === '' || req.cookies.user === null) {
      res.sendStatus(403);
    } else {
      let match = 0;
      this.Users.forEach(user => {
        if (user.id === JSON.parse(req.cookies.user).id) {
          match++;
        }
      });
      if (match === 0) {
        this.Users.push(JSON.parse(req.cookies.user));
      }
      for (let i = 0; i < this.Timeouts.length; i++) {
        if (JSON.parse(req.cookies.user).id === this.Timeouts[i].id) {
          clearTimeout(this.Timeouts[i].out);
        }
      }
      this.Timeouts.push({
        out: setTimeout(() => {
          for (let i = 0; i < this.Users.length; i++) {
            if (JSON.parse(req.cookies.user).id === this.Users[i].id) {
              this.Users.splice(i, 1);
            }
          }
        }, 1000),
        id: JSON.parse(req.cookies.user).id
      });
      res.send(this.Users);
    }
  }

  private deleteUser(req: express.Request, res: express.Response, next: express.NextFunction) {
    for (let i = 0; i < this.Users.length; i++) {
      if (req.params.data === this.Users[i].id) {
        this.Users.splice(i, 1);
      }
    }
  }

  private newUser(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req.cookies.user === undefined || req.cookies.user === '' || req.cookies.user === null) {
      let exists = false;
      let id = '';
      let iat = Date.now() + 3600000;
      do {
        const possible = '0123456789';

        for (let i = 0; i < 16; i++) {
          id += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        for (let i = 0; i < this.Users.length; i++) {
          if (this.Users[i].id === id) {
            exists = true;
            id = '';
          }
        }
      } while (exists);
      this.Users.push({ name: req.body.name, id: id, iat: iat, color: req.body.color });
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('user', JSON.stringify({ name: req.body.name, id: id, color: req.body.color, iat: iat }), {
          maxAge: 60 * 60 * 24 * 7 // 1 week
        })
      );
      res.send({ name: req.body.name, color: req.body.color, id: id, iat: iat });
    } else {
      res.send(JSON.parse(decodeURIComponent(req.cookies.user)));
    }
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
