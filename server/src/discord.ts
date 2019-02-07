import * as express from 'express';
import * as path from 'path';
import * as fs from 'fs';

export let _discord = express();

_discord.use(express.static(path.join(__dirname, '../../discord/dist/discord/')));
_discord.get(['/'], (req, res, next) => {
  res.sendFile(path.join(__dirname, '../../discord/dist/discord/index.html'));
});
_discord.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));
