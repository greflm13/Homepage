import express from 'express';
import path from 'path';
import https from 'https';
import fs from 'fs';
import { log } from './server';

export let _ifttt = express();
const regexp = /\(.+\)|\[.+\]+/g
// const Users: User[] = [{
// user: 'sorogon',
// key: 'fox0r0CxPR0h7fNmBKaFhKXE0JCOM1Vnf-_uCzaYyYF',
// subreddits: [
// 'progmetal',
// 'PowerMetal',
// 'symphonicmetal',
// 'progrockmusic',
// 'BlackMetal',
// 'Deathmetal',
// 'ClassicRock',
// 'retrowave',
// 'synthwave',
// 'psychedelicrock/'
// ]
// }]
const Users: User[] = JSON.parse(fs.readFileSync(path.join(__dirname, 'users.json')).toString());

// _ifttt.use(express.static(path.join(__dirname, 'discord/')));
// _ifttt.get(['/'], (_req, res, _next) => {
//   res.sendFile(path.join(__dirname, 'discord/index.html'));
// });
_ifttt.post('/spotify', (req, res, next) => spotify(req, res, next));
_ifttt.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));

function spotify(req: express.Request, res: express.Response, _next: express.NextFunction) {
  const song: Req = req.body;
  log.fine('Input: ' + song.title + ', Subreddit: ' + song.subreddit);
  const spoti: Data = { value1: '', value2: '', value3: song.subreddit };

  if (song.title.includes(' - ')) {
    song.title = song.title.split(regexp).join('');
    spoti.value2 = song.title.slice(0, song.title.indexOf(' - ')).trim();
    spoti.value1 = song.title.slice(song.title.indexOf(' - ') + 3).trim();
    log.fine('Parsed Output: Artist: ' + spoti.value2 + ', Title: ' + spoti.value1 + ', Subreddit: ' + spoti.value3);

    Users.forEach(user => {
      webhook(spoti, user);
    })
    res.sendStatus(200);
  } else if (song.title.includes('by')) {
    song.title = song.title.split(regexp).join('');
    spoti.value1 = song.title.slice(0, song.title.indexOf(' by ')).trim();
    spoti.value2 = song.title.slice(song.title.indexOf(' by ') + 4).trim();
    log.fine('Parsed Output: Artist: ' + spoti.value2 + ', Title: ' + spoti.value1 + ', Subreddit: ' + spoti.value3);

    Users.forEach(user => {
      webhook(spoti, user);
    })
    res.sendStatus(200);
  } else {
    log.fine('Not a Song')
    res.status(403).send('Not a Song');
  }
}

function webhook(dataa: Data, user: User) {
  user.subreddits.forEach(subreddit => {
    if (subreddit === dataa.value3) {
      log.fine('Sent to user ' + user.user);
      const data = JSON.stringify(dataa);
      const options = {
        hostname: 'maker.ifttt.com',
        port: 443,
        path: '/trigger/spotify/with/key/' + user.key,
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': data.length
        }
      }
      const request = https.request(options, response => {

        response.on('data', _d => {
          // process.stdout.write(_d)
        })
      })

      request.on('error', error => {
        console.error(error)
      })

      request.write(data)
      request.end()
    }
  })
}

interface User {
  user: string,
  key: string,
  subreddits: string[]
}

interface Data {
  value1: string,
  value2: string,
  value3: string
}

interface Req {
  title: string,
  subreddit: string
}