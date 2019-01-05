import * as express from 'express';
import * as path from 'path';
import { DB } from './db';

export let _timeline = express();

_timeline.use(express.static(path.join(__dirname, '../../timeline/dist/')));
_timeline.get(['/'], (req, res, next) => {
  res.sendFile(path.join(__dirname, '../../timeline/dist/index.html'));
});
_timeline.get('/events', (req, res, next) => getEvents(req, res, next));
_timeline.post('/newEvent', (req, res, next) => postEvent(req, res, next));
_timeline.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));

async function getEvents(req: express.Request, res: express.Response, next: express.NextFunction) {
  const events = await DB.Instance.getEvents();
  console.log(events);
  res.send(events);
}

async function postEvent(req: express.Request, res: express.Response, next: express.NextFunction) {
  await DB.Instance.putEvent(req.body);
  await setTimeout(() => {}, 10);
  const events = await DB.Instance.getEvents();
  res.send(events);
}
