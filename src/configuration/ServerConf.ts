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

  /**
   * Initializes the server configuration
   * @method
   * @param {IServerConf} options The server configuration options.
   */
  initialize(options: IServerConf) {
    this.distPath = options.distPath || this.distPath;
    this.routePrefix = options.routePrefix || this.routePrefix;
  }
}
