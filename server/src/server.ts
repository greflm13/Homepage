process.env['DEBUG'] = '*::INFO, *::WARN, *::ERR, *::SEVERE, *::';
process.env['DEBUG_COLORS'] = 'true';
process.env['DEBUG_STREAM'] = 'stdout';

import * as express from 'express';
import * as path from 'path';
import * as bodyparser from 'body-parser';
import * as cookieparser from 'cookie-parser';
import * as http from 'http';
import * as https from 'https';
import * as fs from 'fs';
import * as requestLanguage from 'express-request-language';
import * as debugsx from 'debug-sx';

import { _chat } from './chat';
import { _films } from './films';
import { _timeline } from './timeline';
import { _2048 } from './2048';
import { _minesweeper } from './minesweeper';
import { _minecraftServer } from './minecraft-server';
import { _discord } from './discord';
import { _vinyl } from './vinyl';

const date = new Date();
export const log: debugsx.IFullLogger = debugsx.createFullLogger('Homepage');
const consolelogger: debugsx.IHandler = debugsx.createConsoleHandler('stdout', '*::INFO, *::FINE, *::SEVERE, *::ERR, *::WARN', '-*', [
  { level: 'INFO', color: 'green', inverse: true },
  { level: 'FINE', color: 'white', inverse: true },
  { level: 'SEVERE', color: 'black', inverse: true },
  { level: 'ERR', color: 'red', inverse: true },
  { level: 'WARN', color: 'yellow', inverse: true }
]);
let filelogger: debugsx.IHandler;
filelogger = debugsx.createFileHandler(
  __dirname +
    '/log/' +
    'server_' +
    date.getDate() +
    '-' +
    date.getMonth() +
    '-' +
    date.getFullYear() +
    '_' +
    date.getHours() +
    '.' +
    date.getMinutes() +
    '.' +
    date.getSeconds() +
    '.log',
  '*::INFO, *::FINE, *::SEVERE, *::ERR, *::WARN',
  '-*',
  [
    { level: 'INFO', color: 'green', inverse: true },
    { level: 'FINE', color: 'white', inverse: true },
    { level: 'SEVERE', color: 'black', inverse: true },
    { level: 'ERR', color: 'red', inverse: true },
    { level: 'WARN', color: 'yellow', inverse: true }
  ]
);
debugsx.addHandler(filelogger, consolelogger);

export class Server {
  // #region Singleton

  private static _instance: Server;

  public static get Instance(): Server {
    if (Server._instance === undefined) {
      Server._instance = new Server();
    }
    return Server._instance;
  }

  // #endregion

  private _express = express();
  private _appredirect = express();

  private constructor() {
    this._express.use(bodyparser.json({ limit: '1mb' }));
    this._express.use(bodyparser.urlencoded({ limit: '1mb', extended: true }));
    this._express.use(cookieparser());
    this._express.use(requestLanguage({ languages: ['en-GB', 'en-US', 'de-DE', 'de-AT'] }));
    this._express.set('views', path.join(__dirname, '/views'));
    const pugEngine = this._express.set('view engine', 'pug');
    pugEngine.locals.pretty = true;
    this._express.use((req, res, next) => this.logger(req, res, next, 'Main'));

    // Modules
    this._express.use(function(req, res, next) {
      res.set('X-Clacks-Overhead', 'GNU Terry Pratchett');
      next();
    });
    this._express.use('/chat', _chat);
    this._express.use('/films', _films);
    this._express.use('/timeline', _timeline);
    this._express.use('/2048', _2048);
    this._express.use('/minesweeper', _minesweeper);
    this._express.use('/minecraft', _minecraftServer);
    this._express.use('/discord', _discord);
    this._express.use('/vinyl', _vinyl);

    // Main
    this._express.use('/de', express.static(path.join(__dirname, './public/de')));
    this._express.use('/en', express.static(path.join(__dirname, './public/en')));
    this._express.get('*.php', (req, res, next) => {
      res.sendFile(path.join(__dirname, '/views/no.html'));
    });
    this._express.use(express.static(path.join(__dirname, './public')));
    this._express.use('/', (req, res, next) => this.languageselector(req, res, next));
    this._express.use(this.error404Handler);
    this._express.use(this.errorHandler);

    // Redirect
    this._appredirect.use((req, res, next) => this.logger(req, res, next, 'Redirect'));
    this._appredirect.get('*.php', (req, res, next) => {
      res.sendFile(path.join(__dirname, '/views/no.html'));
    });
    this._appredirect.get('/err', (err: any, req: express.Request, res: express.Response, next: express.NextFunction) =>
      this.errorHandler(err, req, res, next)
    );
    this._appredirect.get('*', function(req, res) {
      res.redirect('https://' + req.headers.host + req.url);
    });
  }

  private languageselector(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req.language === 'de-DE' || req.language === 'de-AT') {
      res.redirect('/de');
      return;
    } else {
      res.redirect('/en');
      return;
    }
  }

  private error404Handler(req: express.Request, res: express.Response, next: express.NextFunction) {
    const clientSocket = req.socket.remoteAddress + ':' + req.socket.remotePort;
    log.warn('Error 404 for %s %s from %s', req.method, req.url, clientSocket);
    res.status(404).sendFile(path.join(__dirname, './views/error404.html'));
  }

  private errorHandler(err: express.Errback, req: express.Request, res: express.Response, next: express.NextFunction) {
    const ts = new Date().toLocaleString();
    if (err.toString().startsWith('Error: ENOENT')) {
      res.sendFile(path.join(__dirname, './views/update.html'));
      log.warn('Update deploying...');
    } else {
      log.severe('Error %s\n%e', ts, err);
      res.status(500).render('error500.pug', {
        time: ts,
        err: err,
        href:
          'mailto:sorogon.developer@gmail.com?subject=Server failed;&body=https://www.sorogon.eu/ failed at ' + ts + ' with Error: ' + err,
        serveradmin: 'Florian Greistorfer'
      });
      process.abort();
    }
  }

  private logger(req: express.Request, res: express.Response, next: express.NextFunction, server: string) {
    const clientSocket = req.socket.remoteAddress + ':' + req.socket.remotePort;
    log.info(server + ':', req.method, req.url, clientSocket);
    next();
  }

  public start(httpport: number, httpsport?: number): Promise<Server> {
    return new Promise<Server>((resolve, reject) => {
      if (httpsport) {
        log.info('Starting HTTPS Server...');
        const privKey = fs.readFileSync('/home/pi/privkey.pem', 'utf8');
        const cert = fs.readFileSync('/home/pi/fullchain.pem', 'utf8');
        const credentials = { key: privKey, cert: cert };
        const server = https.createServer(credentials, this._express).listen(httpsport, () => {
          log.info('HTTPS Server running on port ' + httpsport + '.');
          server.on('close', () => {
            log.fine('Server stopped.');
          });
          server.on('err', err => {
            log.warn(err);
          });
        });
        log.info('Starting HTTP Server...');
        const httpserver = http.createServer(this._appredirect).listen(httpport, () => {
          log.info('HTTP Server running on port ' + httpport + '.');
          httpserver.on('close', () => {
            log.fine('HTTP Server stopped.');
          });
          httpserver.on('err', err => {
            log.severe(err);
          });
        });
      } else {
        log.info('Starting HTTP Server...');
        const server = http.createServer(this._express).listen(httpport, () => {
          log.info('HTTP Server running on port ' + httpport + '.');
          server.on('close', () => {
            log.fine('Server stopped.');
          });
          server.on('err', err => {
            log.warn(err);
          });
        });
      }
    });
  }
}
