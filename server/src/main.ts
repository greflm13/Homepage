import { Server } from './server';
import { log } from './server';

const httpport = 8080;
const httpsport = 8443;

class Main {
  constructor() {}

  public async init() {
    Server.Instance.start(httpport, httpsport).catch(err => {
      log.severe(err);
      process.exit();
    });
  }
}

async function main() {
  const m = new Main();
  await m.init();
}

main();
