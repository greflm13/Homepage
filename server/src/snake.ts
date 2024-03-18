import express from 'express';
import path from 'path';
import fs from 'fs';

export let _snake = express();

_snake.use(express.static(path.join(__dirname, 'snake/')));
_snake.post('/leaderboard', postLeaderboard);
_snake.get('/leaderboard', getLeaderboard);
_snake.get(['/'], (_req, res, _next) => {
  res.sendFile(path.join(__dirname, 'snake/index.html'));
});
_snake.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));

function postLeaderboard(req: express.Request, res: express.Response, _next: express.NextFunction) {
  const leaderboard: Leaderboard = JSON.parse(fs.readFileSync(path.join(__dirname, './leaderboardSnake.json')).toString());
  if (req.body !== null && req.body !== undefined) {
    leaderboard.people.push(req.body);
    leaderboard.people.sort(
      (leftSide, rightSide): number => {
        if (leftSide.score > rightSide.score) {
          return -1;
        }
        if (leftSide.score < rightSide.score) {
          return 1;
        } else {
          if (leftSide.time < rightSide.time) {
            return -1;
          }
          if (leftSide.time > rightSide.time) {
            return 1;
          }
          return 0;
        }
      });
  }
  if (leaderboard.people.length > 10) {
    leaderboard.people.pop();
  }
  fs.writeFileSync(path.join(__dirname, './leaderboardSnake.json'), JSON.stringify(leaderboard));
  res.send(JSON.stringify(JSON.parse(fs.readFileSync(path.join(__dirname, './leaderboardSnake.json')).toString())));
}

function getLeaderboard(_req: express.Request, res: express.Response, _next: express.NextFunction) {
  res.send(JSON.stringify(JSON.parse(fs.readFileSync(path.join(__dirname, './leaderboardSnake.json')).toString())));
}

interface Leaderboard {
  people: PeopleSnake[];
}

interface PeopleSnake {
  name: string;
  score: number;
  time: number;
}
