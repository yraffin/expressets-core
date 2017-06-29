import { MongoClient, Db, MongoClientOptions, ReadPreference } from 'mongodb';
import * as config from 'config';
import { Service, Container } from 'typedi';
import { Mongo as MongoConf } from '../configuration';

@Service()
export class Mongo {

  private _db: Db;

  async db() {
    if (!this._db) {
      this._db = await this.connect();
    }
    return this._db;
  }

  async health() {
    // something like this:
    // https://github.com/dannydavidson/k8s-neo-api/blob/master/annotely-graph/apps/ops/health.js
    return true;
  }

  disconnect() {
    if (!this._db) {
      return;
    }

    this._db.close();
  }

  /**
   * Connect to mongo db
   * @method
   * @returns {Promise<Db>}
   */
  async connect() {
    const config = Container.get(MongoConf);
    const listServ = config.servers.split(' ');
    const url = listServ.reduce((prev, cur) => prev + cur + ',',
      `mongodb://${config.user}:${config.password}@`);
    const options: MongoClientOptions = {
      authSource: 'admin',
      w: 'majority',
      wtimeout: 1000,
      j: true,
      readPreference: ReadPreference.SECONDARY_PREFERRED,
      native_parser: false,
      autoReconnect: true,
      poolSize: 10,
      socketOptions: {
        keepAlive: 300,
        connectTimeoutMS: 30000,
        socketTimeoutMS: 30000
      },
      //replicaSet: config.replica,
      ha: true,
      haInterval: 10000
    };

    if(listServ.length > 1){
        options.replicaSet = config.replica;
    }

    const db = await MongoClient.connect(`${url.substr(0, url.length - 1)}/${config.db}`, options);

    // authenticate to db
    // await db.admin().authenticate(config.user, config.password);
    return db;
  }

}
