import { Server } from './server';
import { log } from './server';

const httpport = 8080;

class Main {
  constructor() {}

  public async init() {
    Server.Instance.start(httpport).catch(err => {
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
