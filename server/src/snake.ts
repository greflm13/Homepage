import express from 'express';
import path from 'path';

export let _snake = express();

_snake.use(express.static(path.join(__dirname, 'snake/')));
_snake.get(['/'], (_req, res, _next) => {
  res.sendFile(path.join(__dirname, 'snake/index.html'));
});
_snake.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));
