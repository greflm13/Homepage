import express from 'express';
import path from 'path';
import fs from 'fs';

export let _minesweeper = express();

_minesweeper.use(express.static(path.join(__dirname, 'minesweeper/')));
_minesweeper.post('/leaderboard', postLeaderboard);
_minesweeper.get('/leaderboard', getLeaderboard);
_minesweeper.get(['/'], (_req, res, _next) => {
  res.sendFile(path.join(__dirname, 'minesweeper/index.html'));
});
_minesweeper.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));

function postLeaderboard(req: express.Request, res: express.Response, _next: express.NextFunction) {
  const leaderboard: Leaderboard = { minesweeper: { easy: [], medium: [], hard: [], people: [] } };
  leaderboard.minesweeper = req.body.minesweeper;
  fs.writeFileSync(path.join(__dirname, './leaderboardMinesweeper.json'), JSON.stringify(leaderboard));
  res.send(JSON.stringify(JSON.parse(fs.readFileSync(path.join(__dirname, './leaderboardMinesweeper.json')).toString())));
}

function getLeaderboard(_req: express.Request, res: express.Response, _next: express.NextFunction) {
  res.send(JSON.stringify(JSON.parse(fs.readFileSync(path.join(__dirname, './leaderboardMinesweeper.json')).toString())));
}

interface Leaderboard {
  minesweeper: Minesweeper;
}

interface Minesweeper {
  easy: People[];
  medium: People[];
  hard: People[];
  people: People[];
}

interface People {
  name: string;
  x: number;
  y: number;
  field_size: string;
  bomb_count: number;
  time: number;
}
