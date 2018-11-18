import * as express from 'express';
import * as https from 'https';
import * as path from 'path';
import * as fs from 'fs';

export let _discord = express();

_discord.get('**', (req, res, next) => {
  postMessage(req, res, next);
});

function postMessage(req: express.Request, resp: express.Response, next: express.NextFunction) {
  let message = { content: 'HAHA', username: "Sorogon's Express Server" };
  let options: https.RequestOptions = {
    host: 'ptb.discordapp.com',
    port: 443,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    path: '/api/webhooks/513674117866717184/sjB68cUESB2NlL7lzAfaG_zzrrwgtqBuzcLyEzlGz3kzsF6LDHwvfx42kk41ob510uHE'
  };
  let post = https.request(options, res => {
    res.setEncoding('utf8');
    res.on('data', chunk => {
      console.log(chunk);
    });
    res.on('end', () => {
      resp.sendStatus(204);
    });
  });
  post.write(JSON.stringify(message));
  post.end();
}
