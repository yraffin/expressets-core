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

  /** Gets or sets a value indicating whether to use mongodb session store. @property {boolean} */
  useSessionStore?: boolean;

  /** Gets or sets the session secret. @property {string} */
  sessionSecret?: string;

  /** Gets or sets the session max age. @property {number} */
  sessionMaxAge?: number;
}

/**
 * Represents the application mongo config
 * @class
 */
export class Mongo {
  /** The config db name @property {string} */
  private _db = config.get<string>('mongo.db');

  /** The config user @property {string} */
  private _user = config.get<string>('mongo.user');

  /** The config password @property {string} */
  private _password = config.get<string>('mongo.password');

  /** The config replica @property {string} */
  private _replica = config.get<string>('mongo.replica');

  /** The config servers @property {string} */
  private _servers = config.get<string>('mongo.servers');

  /** The value indicating whether to use mongodb session store @property {boolean} */
  private _useSessionStore = config.get<boolean>('mongo.useSessionStore');

  /** The config session secret @property {string} */
  private _sessionSecret = 'Mongo session secret';

  /** The config session max age @property {number} */
  private _sessionMaxAge = 24 * 60 * 60; // 1 day in second

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

  /** Gets the session secret. @property {string} */
  get sessionSecret() {
    return process.env.DB_SESSION_SECRET || this._sessionSecret;
  }

  /** Sets the session secret. @property {string} */
  set sessionSecret(value: string) {
    this._sessionSecret = value;
  }

  /** Gets the session max age. @property {number} */
  get sessionMaxAge() {
    return process.env.DB_SESSION_MAX_AGE ? parseInt(process.env.DB_SESSION_MAX_AGE, 10) : this._sessionMaxAge;
  }

  /** Sets the session mas age. @property {number} */
  set sessionMaxAge(value: number) {
    this._sessionMaxAge = value;
  }

  /** Gets the a value indicating whether to use session store. @property {boolean} */
  get useSessionStore() {
    return process.env.DB_SESSION_STORE ?
      (['true', '1'].indexOf(process.env.DB_SESSION_STORE.toLowerCase()) > -1) : this._useSessionStore;
  }

  /** Sets the a value indicating whether to use session store. @property {boolean} */
  set useSessionStore(value: boolean) {
    this._useSessionStore = value;
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
    this.useSessionStore = options.useSessionStore || this.useSessionStore;
    this.sessionSecret = options.sessionSecret || this.sessionSecret;
    this.sessionMaxAge = options.sessionMaxAge || this.sessionMaxAge;
  }
}
