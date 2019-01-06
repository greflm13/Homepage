import * as express from 'express';
import * as path from 'path';
import * as fs from 'fs';

export let _2048 = express();

_2048.use(express.static(path.join(__dirname, '../../game2048/dist/game2048/')));
_2048.get(['/'], (req, res, next) => {
  res.sendFile(path.join(__dirname, '../../game2048/dist/game2048/index.html'));
});
_2048.post('/leaderboard', postLeaderboard);
_2048.get('/leaderboard', getLeaderboard);
_2048.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));

function postLeaderboard(req: express.Request, res: express.Response, next: express.NextFunction) {
  const leaderboard: Leaderboard = { g2048: { people: [] } };
  for (let i = 0; i < 10; i++) {
    if (req.body.g2048.people[i] !== null && req.body.g2048.people[i] !== undefined) {
      leaderboard.g2048.people.push(req.body.g2048.people[i]);
    }
  }
  fs.writeFileSync(path.join(__dirname, '../leaderboard2048.json'), JSON.stringify(leaderboard));
  res.send(JSON.stringify(JSON.parse(fs.readFileSync(path.join(__dirname, '../leaderboard2048.json')).toString())));
}

function getLeaderboard(req: express.Request, res: express.Response, next: express.NextFunction) {
  res.send(JSON.stringify(JSON.parse(fs.readFileSync(path.join(__dirname, '../leaderboard2048.json')).toString())));
}

interface Leaderboard {
  g2048: G2048;
}

interface G2048 {
  people: People2048[];
}

interface People2048 {
  name: string;
  score: number;
  time: number;
}
