import express from 'express';
import path from 'path';

export let _discord = express();

_discord.use(express.static(path.join(__dirname, 'discord/')));
_discord.get(['/'], (_req, res, _next) => {
  res.sendFile(path.join(__dirname, 'discord/index.html'));
});
_discord.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));
