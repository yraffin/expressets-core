import * as config from 'config';

/**
 * Represents the server conf interface.
 * @interface
 */
export interface IServerConf {
  /** Gets or sets the path of dist folder. @property {string} */
  distPath?: string;

  /** Gets or sets the api route prefix. @property {string} */
  routePrefix?: string;

  /** Gets or sets the api socket origins. @property {string} */
  socketOrigins?: string;
}

/**
 * Represents the application server configuration
 * @class
 */
export class ServerConf {
  /** The config dist path */
  distPath = './dist';

  /** The config routePrefix path */
  routePrefix = '/api';

  /** The socket origins */
  private _socketOrigins = config.get<string>('socket_origins') || '*:*';

  /** Gets the socket origins. @property {string} */
  get socketOrigins() {
    return process.env.SOCKET_ORIGINS || this._socketOrigins;
  }
  
  /** Sets the socket origins. @property {string} */
  set socketOrigins(value: string) {
    this._socketOrigins = value;
  }

  /**
   * Initializes the server configuration
   * @method
   * @param {IServerConf} options The server configuration options.
   */
  initialize(options: IServerConf) {
    this.distPath = options.distPath || this.distPath;
    this.routePrefix = options.routePrefix || this.routePrefix;
    this.socketOrigins = options.socketOrigins || this.socketOrigins;
  }
}
