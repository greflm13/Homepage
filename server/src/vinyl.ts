import express from 'express';
import path from 'path';
import { DB } from './db';

export let _vinyl = express();

_vinyl.use(express.static(path.join(__dirname, 'vinyl/')));
_vinyl.get(['/', '/new', '/detail/:album', '/detail', '/small/:album', '/small', '/random'], (_req, res, _next) => {
  res.sendFile(path.join(__dirname, 'vinyl/index.html'));
});
_vinyl.get('/albums', (req, res, next) => getAlbums(req, res, next));
_vinyl.post('/album', (req, res, next) => postAlbum(req, res, next));
_vinyl.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));

async function getAlbums(_req: express.Request, res: express.Response, _next: express.NextFunction) {
  const albums = await DB.Instance.getAlbums();
  res.send(albums);
}

async function postAlbum(req: express.Request, res: express.Response, _next: express.NextFunction) {
  await DB.Instance.putAlbum(req.body);
  await setTimeout(() => {}, 10);
  const albums = await DB.Instance.getAlbums();
  res.send(albums);
}
