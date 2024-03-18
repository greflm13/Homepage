import express from 'express';
import path from 'path';
import http from 'http';
import { log } from './server';

export let _minecraftServer = express();

_minecraftServer.use(express.static(path.join(__dirname, 'minecraft-server/')));
_minecraftServer.get(['/'], (_req, res, _next) => {
  res.sendFile(path.join(__dirname, 'minecraft-server/index.html'));
});
_minecraftServer.get('/status/:data', (req, res, next) => status(req, res, next));
_minecraftServer.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));

function status(req: express.Request, res: express.Response, _next: express.NextFunction) {
  http
    .get({ port: 443, host: 'api.mcstatus.io', path: '/v2/status/java/' + req.params.data + '.sorogon.eu' }, resp => {
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
