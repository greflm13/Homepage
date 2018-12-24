import * as express from 'express';
import * as path from 'path';
import * as fs from 'fs';

export let _timeline = express();

_timeline.use(express.static(path.join(__dirname, '../../timeline/dist/')));
_timeline.get(['/'], (req, res, next) => {
  res.sendFile(path.join(__dirname, '../../timeline/dist/index.html'));
});
_timeline.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));
