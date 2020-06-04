import express from 'express';
import path from 'path';

export let _filehost = express();

_filehost.use(express.static(path.join(__dirname, 'filehost/')));
_filehost.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));
