import express from 'express';
import path from 'path';
import https from 'https';
import fs from 'fs';
// import cookie from 'cookie';
import { log } from './server';

export let _ifttt = express();
// let Timeouts: [];
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
// 'synthwave',
// 'psychedelicrock/'
// ]
// }]
let Users: User[] = [];
try {
  Users = JSON.parse(fs.readFileSync(path.join(__dirname, 'users.json')).toString());
} catch (err) {
  Users = [];
};


// _ifttt.use(express.static(path.join(__dirname, 'discord/')));
// _ifttt.get(['/'], (_req, res, _next) => {
//   res.sendFile(path.join(__dirname, 'discord/index.html'));
// });
_ifttt.post('/spotify', (req, res, next) => spotify(req, res, next));
_ifttt.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));

function spotify(req: express.Request, res: express.Response, _next: express.NextFunction) {
  let song: Req = req.body;
  log.fine('Input: ' + song.title + ', Subreddit: ' + song.subreddit);
  const spoti: Data = { value1: '', value2: '', value3: song.subreddit };
  if (song.subreddit === 'outrun' || song.subreddit === 'retrowave') {
    spoti.value3 = 'synthwave'
  }

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
    res.status(200).send('Not a Song');
  }
}

function webhook(dataa: Data, user: User) {
  user.subreddits.forEach(subreddit => {
    if (subreddit.toLowerCase() === dataa.value3.toLowerCase()) {
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

// function returnUsers(req: express.Request, res: express.Response, _next: express.NextFunction) {
//   if (req.cookies.user === undefined || req.cookies.user === '' || req.cookies.user === null) {
//     res.sendStatus(403);
//   } else {
//     let match = 0;
//     Users.forEach(user => {
//       if (user.id === JSON.parse(req.cookies.user).id) {
//         match++;
//       }
//     });
//     if (match === 0) {
//       Users.push(JSON.parse(req.cookies.user));
//     }
//     for (let i = 0; i < Timeouts.length; i++) {
//       if (JSON.parse(req.cookies.user).id === Timeouts[i].id) {
//         clearTimeout(Timeouts[i].out);
//       }
//     }
//     Timeouts.push({
//       out: setTimeout(() => {
//         for (let i = 0; i < Users.length; i++) {
//           if (JSON.parse(req.cookies.user).id === Users[i].id) {
//             Users.splice(i, 1);
//           }
//         }
//       }, 1000),
//       id: JSON.parse(req.cookies.user).id
//     });
//     res.send(Users);
//   }
// }

// function deleteUser(req: express.Request, _res: express.Response, _next: express.NextFunction) {
//   for (let i = 0; i < Users.length; i++) {
//     if (req.params.data === Users[i].id) {
//       Users.splice(i, 1);
//     }
//   }
// }

// function newUser(req: express.Request, res: express.Response, _next: express.NextFunction) {
//   if (req.cookies.user === undefined || req.cookies.user === '' || req.cookies.user === null) {
//     let exists = false;
//     let id = '';
//     const iat = Date.now() + 3600000;
//     do {
//       const possible = '0123456789';

//       for (let i = 0; i < 16; i++) {
//         id += possible.charAt(Math.floor(Math.random() * possible.length));
//       }

//       for (let i = 0; i < Users.length; i++) {
//         if (Users[i].id === id) {
//           exists = true;
//           id = '';
//         }
//       }
//     } while (exists);
//     Users.push({ name: req.body.name, id: id, iat: iat, color: req.body.color });
//     res.setHeader(
//       'Set-Cookie',
//       cookie.serialize('user', JSON.stringify({ name: req.body.name, id: id, color: req.body.color, iat: iat }), {
//         maxAge: 60 * 60 * 24 * 365 // 1 Year
//       })
//     );
//     res.send({ name: req.body.name, color: req.body.color, id: id, iat: iat });
//   } else {
//     res.send(JSON.parse(decodeURIComponent(req.cookies.user)));
//   }
// }

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