import * as express from 'express';
import * as path from 'path';
import * as http from 'http';
import { log } from './server';

export let _minecraftServer = express();

_minecraftServer.use(express.static(path.join(__dirname, '../../minecraft-server/dist/minecraft-server/')));
_minecraftServer.get(['/'], (req, res, next) => {
  res.sendFile(path.join(__dirname, '../../minecraft-server/dist/minecraft-server/index.html'));
});
_minecraftServer.get('/status', (req, res, next) => status(req, res, next));
_minecraftServer.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));

function status(req: express.Request, res: express.Response, next: express.NextFunction) {
  http
    .get({ port: 80, host: 'mcapi.us', path: '/server/status?ip=minecraft.sorogon.eu' }, resp => {
      let data = '';

      resp.on('data', chunk => {
        data += chunk;
      });

      resp.on('end', () => {
        try {
          res.json(JSON.parse(data));
        } catch (err) {
          log.warn(err);
        }
      });
    })
    .on('error', err => {
      log.warn(err);
    });
}
