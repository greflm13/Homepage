import mongodb from 'mongodb';
import { log } from './server';

export class DB {
  public static async createInstance(_socket = 'localhost:27017'): Promise<DB> {
    if (DB._instance) {
      throw Error('instance already created');
    }
    const instance = new DB();
    await instance.start();
    DB._instance = instance;
    return DB._instance;
  }

  private static _instance: DB;

  public static get Instance(): DB {
    if (!DB._instance) {
      throw new Error('instance not created yet');
    }
    return DB._instance;
  }

  private _timeline!: mongodb.Collection;
  private _albums!: mongodb.Collection;

  private constructor() { }

  public async getEvents(): Promise<Object[]> {
    return await this._timeline.find().toArray();
  }

  public async putEvent(event: Object) {
    await this._timeline.insertOne(event);
  }

  public async getAlbums(): Promise<Object[]> {
    return await this._albums.find().toArray();
  }

  public async putAlbum(event: Object) {
    await this._albums.insertOne(event);
  }

  private async start() {
    const url =
      'mongodb://homepage:g74775@cluster0-shard-00-00-10aya.gcp.mongodb.net:27017,cluster0-shard-00-01-10aya.gcp.mongodb.net:27017,cluster0-shard-00-02-10aya.gcp.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';
    try {
      const dbServer = await mongodb.MongoClient.connect(url, { socketTimeoutMS: 2147483647 });
      const db = dbServer.db('sorogoneu');
      const collTimeline = db.collection('timeline');
      const collAlbums = db.collection('albums');

      this._timeline = collTimeline;
      this._albums = collAlbums;
      log.info('Database connected.');
    } catch (err) {
      throw err;
    }
  }
}

export interface DbUser {
  user_name: string;
  user_password: string;
}
