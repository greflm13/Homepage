import express from 'express';
import path from 'path';
import fs from 'fs';

export let _fahrtenbuch = express();

_fahrtenbuch.use(express.static(path.join(__dirname, 'fahrtenbuch/')));
_fahrtenbuch.get(['/'], (_req, res, _next) => {
  res.sendFile(path.join(__dirname, 'fahrtenbuch/index.html'));
});
_fahrtenbuch.get('/data', (_req, _res, _next)=> getData(_req, _res, _next));
_fahrtenbuch.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));

function getData(req: express.Request, res: express.Response, next: express.NextFunction) {
  res.send(JSON.stringify(JSON.parse(fs.readFileSync(path.join(__dirname, './fahrtenbuch.json')).toString())));
}

function setData(req: express.Request, res: express.Response, next: express.NextFunction) {
  const data: Data = req.body;

  fs.writeFileSync(path.join(__dirname, './fahrtenbuch.json'), JSON.stringify(data));
  res.send(JSON.stringify(JSON.parse(fs.readFileSync(path.join(__dirname, './fahrtenbuch.json')).toString())));
}

interface Data {
  trips: Trip[]
}

interface Trip {
  date: Date;
  name: string;
  before: number;
  after: number;
  diff: number;
}