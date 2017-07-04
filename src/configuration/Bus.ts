import * as config from 'config';

/**
 * Represents the bus service interface.
 * @interface
 */
export interface IBus {
  /** Gets or sets the connection string. @property {connectionString} */
  connectionString?: string;
}

/**
 * Represents the application bus service configuration
 * @class
 */
export class Bus {
  /** The config connection string */
  private _connectionString = config.get<string>('bus.connection_string');

  /** Gets the connection string. @property {string} */
  get connectionString() {
    return <string>process.env.AZURE_SERVICEBUS_CONNECTION_STRING || this._connectionString;
  }
  
  /** Sets the connection string. @property {string} */
  set connectionString(value: string) {
    this._connectionString = value;
  }

  /**
   * Initializes the bus service configuration
   * @method
   * @param {IBus} options The bus service configuration options.
   */
  initialize(options: IBus) {
    this.connectionString = options.connectionString || this.connectionString;
  }
}
