import * as config from 'config';
import * as fs from 'fs';
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

  /** The ssl key file */
  fsSslKey;

  /** The ssl key crt */
  fsSslCrt;

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
   * Gets the ssl config for http2
   * @method
   */
  get ssl() {
    if (!process.env.SSL_KEY || !process.env.SSL_CRT) {
      return null;
    }
    if (!fs.existsSync(process.env.SSL_KEY) || !fs.existsSync(process.env.SSL_CRT)) {
      return null;
    }

    if (!this.fsSslKey) {
      this.fsSslKey = fs.readFileSync(process.env.SSL_KEY);
    }

    if (!this.fsSslCrt) {
      this.fsSslCrt = fs.readFileSync(process.env.SSL_CRT);
    }

    return {
      key: this.fsSslKey,
      cert: this.fsSslCrt
    };
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
