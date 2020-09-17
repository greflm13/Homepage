import express from 'express';
import path from 'path';
import util from 'util';
const execFile = util.promisify(require('child_process').execFile);

export let _filehost = express();

_filehost.get('**', (req, res, next) => refresh(req, res, next));
_filehost.use(express.static(path.join(__dirname, 'filehost/')));
_filehost.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));

async function refresh(_req: express.Request, _res: express.Response, next: express.NextFunction) {
    await execFile(path.join(__dirname, 'filehost/refresh_filelist'));
    next();
}