import express from 'express';
import path from 'path';
import https from 'https';

export let _ifttt = express();
const regexp = /\([\w-]+\)|\[[\w-]+\]+/g

// _ifttt.use(express.static(path.join(__dirname, 'discord/')));
// _ifttt.get(['/'], (_req, res, _next) => {
//   res.sendFile(path.join(__dirname, 'discord/index.html'));
// });
_ifttt.post('/spotify', (req, res, next) => spotify(req, res, next));
_ifttt.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));

function spotify(req: express.Request, res: express.Response, _next: express.NextFunction) {
  const song: { title: string, subreddit: string } = req.body;
  const spoti: { value1: string, value2: string, value3: string } = { value1: '', value2: '', value3: song.subreddit };

  song.title = song.title.split(regexp).join('');
  spoti.value2 = song.title.slice(0, song.title.indexOf(' - '));
  spoti.value1 = song.title.slice(song.title.indexOf(' - ') + 3);

  const data = JSON.stringify(spoti);
  const options = {
    hostname: 'maker.ifttt.com',
    port: 443,
    path: '/trigger/spotify/with/key/fox0r0CxPR0h7fNmBKaFhKXE0JCOM1Vnf-_uCzaYyYF',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  }
  const req_ = https.request(options, res_ => {

    res_.on('data', d => {
      process.stdout.write(d)
    })
  })

  req_.on('error', error => {
    console.error(error)
  })

  req_.write(data)
  req_.end()

  res.sendStatus(200);
}