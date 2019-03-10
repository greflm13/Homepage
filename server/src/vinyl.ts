import * as express from 'express';
import * as path from 'path';

export let _vinyl = express();

_vinyl.use(express.static(path.join(__dirname, 'vinyl/')));
_vinyl.get(['/'], (req, res, next) => {
  res.sendFile(path.join(__dirname, 'vinyl/index.html'));
});
_vinyl.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));
