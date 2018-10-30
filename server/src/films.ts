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

setInterval(() => {
  c.list('disk1/share/Filme/', (err, list) => {
    if (err) throw err;
  });
}, 60000);

_films.get('/list', (req, res, next) => list(req, res, next));
_films.get('/list/:folder', (req, res, next) => listFolder(req, res, next));
_films.get('/list/:folder/:subFolder', (req, res, next) => listFolderSubFolder(req, res, next));
_films.get('/item/:path', (req, res, next) => getItem(req, res, next));
_films.get('/item/:path/:subpath', (req, res, next) => getItem(req, res, next));
_films.get('/item/:path/:subpath/:subsubpath', (req, res, next) => getItem(req, res, next));
_films.use(express.static(path.join(__dirname, '../../films/dist/')));
_films.get('**', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../../films/dist/index.html'));
});
_films.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));

function list(req: express.Request, res: express.Response, next: express.NextFunction) {
  c.list('disk1/share/Filme/', (err, list) => {
    if (err) {
      if (err.message.includes('No such file or directory')) {
        res.send([{ name: 'No such file or directory' }]);
        return;
      }
      throw err;
    }
    res.send(list);
  });
}

function listFolder(req: express.Request, res: express.Response, next: express.NextFunction) {
  c.list('disk1/share/Filme/' + req.params.folder, (err, list) => {
    if (err) {
      if (err.message.includes('No such file or directory')) {
        res.send([{ name: 'No such file or directory' }]);
        return;
      }
      throw err;
    }
    res.send(list);
  });
}

function listFolderSubFolder(req: express.Request, res: express.Response, next: express.NextFunction) {
  c.list('disk1/share/Filme/' + req.params.folder + '/' + req.params.subFolder, (err, list) => {
    if (err) {
      if (err.message.includes('No such file or directory')) {
        res.send([{ name: 'No such file or directory' }]);
        return;
      }
      throw err;
    }
    res.send(list);
  });
}

function getItem(req: express.Request, res: express.Response, next: express.NextFunction) {
  let fileSize: number;
  let range = req.headers.range;
  const one = req.params.path;
  const two = req.params.subpath;
  const three = req.params.subsubpath;

  let path = one;

  if (two !== null && two !== undefined && two !== '') {
    path += '/';
    path += two;
  }
  if (three !== null && three !== undefined && three !== '') {
    path += '/';
    path += three;
  }

  c.size('disk1/share/Filme/' + path, (err, size) => {
    if (err) throw err;

    fileSize = size;

    if (range) {
      range = range.toString();
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = end - start + 1;
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4'
      };
      res.writeHead(206, head);
      c.get('disk1/share/Filme/' + path, (err, stream) => {
        if (err) throw err;
        stream.pipe(res);
      });
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4'
      };
      res.writeHead(200, head);
      c.get('disk1/share/Filme/' + path, (err, stream) => {
        if (err) throw err;
        stream.pipe(res);
      });
    }
  });
}
