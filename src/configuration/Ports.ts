import * as config from 'config';

/**
 * Represents the ports interface.
 * @interface
 */
export interface IPorts {
  /** Gets or sets the http port. @property {number} */
  http?: number;

  /** Gets or sets the debug port. @property {number} */
  debug?: number;
}

/**
 * Represents the application ports
 * @class
 */
export class Ports {
  /** The config http port */
  private _port = config.get<number>('ports.http');

  /** The config http debug port */
  private _debug = config.get<number>('ports.debug');

  /** Gets the http port. @property {number} */
  get http() {
    return process.env.PORT ? parseInt(process.env.PORT, 10) : this._port;
  }

  /** Sets the http port. @property {number} */
  set http(value: number) {
    this._port = value;
  }

  /** Gets the debug port. @property {number} */
  get debug() {
    return process.env.PORT_DEBUG ? parseInt(process.env.PORT_DEBUG, 10) : this._debug;
  }

  /** Sets the debug port. @property {number} */
  set debug(value: number) {
    this._debug = value;
  }

  /**
   * Initializes the Ports configuration
   * @method
   * @param {IPorts} options The ports configuration options.
   */
  initialize(options: IPorts) {
    this.http = options.http || this.http;
    this.debug = options.debug || this.debug;
  }
}
