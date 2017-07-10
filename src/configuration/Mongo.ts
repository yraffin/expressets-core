import * as config from 'config';

/**
 * Represents the Mongo interface.
 * @interface
 */
export interface IMongo {
  /** Gets or sets the db. @property {string} */
  db?: string;

  /** Gets or sets the user. @property {string} */
  user?: string;

  /** Gets or sets the password. @property {string} */
  password?: string;

  /** Gets or sets the replica. @property {string} */
  replica?: string;

  /** Gets or sets the servers. @property {string} */
  servers?: string;
}

/**
 * Represents the application mongo config
 * @class
 */
export class Mongo {
  /** The config db name */
  private _db = config.get<string>('mongo.db');

  /** The config user */
  private _user = config.get<string>('mongo.user');

  /** The config password */
  private _password = config.get<string>('mongo.password');

  /** The config replica */
  private _replica = config.get<string>('mongo.replica');

  /** The config servers */
  private _servers = config.get<string>('mongo.servers');

  /** Gets the db name. @property {string} */
  get db() {
    return process.env.DB || this._db;
  }

  /** Sets the db name. @property {string} */
  set db(value: string) {
    this._db = value;
  }

  /** Gets the user. @property {string} */
  get user() {
    return process.env.DB_USER || this._user;
  }

  /** Sets the user. @property {string} */
  set user(value: string) {
    this._user = value;
  }

  /** Gets the password. @property {string} */
  get password() {
    return process.env.DB_PASSWORD || this._password;
  }

  /** Sets the password. @property {string} */
  set password(value: string) {
    this._password = value;
  }

  /** Gets the replica. @property {string} */
  get replica() {
    return process.env.DB_REPLICA || this._replica;
  }

  /** Sets the replica. @property {string} */
  set replica(value: string) {
    this._replica = value;
  }

  /** Gets the servers. @property {string} */
  get servers() {
    return process.env.DB_SERVERS || this._servers;
  }

  /** Sets the servers. @property {string} */
  set servers(value: string) {
    this._servers = value;
  }

  /**
   * Initializes the Mongo configuration
   * @method
   * @param {IMongo} options The ports configuration options.
   */
  initialize(options: IMongo) {
    this.db = options.db || this.db;
    this.user = options.user || this.user;
    this.password = options.password || this.password;
    this.replica = options.replica || this.replica;
    this.servers = options.servers || this.servers;
  }
}
