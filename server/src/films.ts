import * as express from 'express';
import * as path from 'path';
import * as fs from 'fs';
import * as ftp from 'ftp';

export let _films = express();
let c = new ftp();
c.connect({
  host: '100.0.0.102'
});
c.on('end', () => {
  c.connect({
    host: '100.0.0.102'
  });
});

_films.get('/list', (req, res, next) => list(req, res, next));
_films.get('/list/:folder', (req, res, next) => listFolder(req, res, next));
_films.get('/list/:folder/:subFolder', (req, res, next) => listFolderSubFolder(req, res, next));
_films.use(express.static(path.join(__dirname, '../../films/dist/')));
_films.get(['/', '/m'], (req, res, next) => {
  res.sendFile(path.join(__dirname, '../../films/dist/index.html'));
});
_films.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));

function list(req: express.Request, res: express.Response, next: express.NextFunction) {
  c.list('disk1/share/Filme/', (err, list) => {
    if (err) throw err;
    res.send(list);
  });
}

function listFolder(req: express.Request, res: express.Response, next: express.NextFunction) {
  c.list('disk1/share/Filme/' + req.params.folder, (err, list) => {
    if (err) throw err;
    res.send(list);
  });
}

function listFolderSubFolder(req: express.Request, res: express.Response, next: express.NextFunction) {
  c.list('disk1/share/Filme/' + req.params.folder + '/' + req.params.subFolder, (err, list) => {
    if (err) throw err;
    res.send(list);
  });
}
