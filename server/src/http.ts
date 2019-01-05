import { Server } from './server';
import { DB } from './db';
import { log } from './server';

const httpport = 8080;

class Main {
  constructor() {}

  public async init() {
    const db = await DB.createInstance().catch(err => {
      log.severe(err);
      process.exit();
    });
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
