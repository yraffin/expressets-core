import * as config from 'config';

/**
 * Represents the Azure interface.
 * @interface
 */
export interface IAzure {
  /** Gets or sets the connection string. @property {string} */
  busConnectionString?: string;

  /** Gets or sets the application insights key. @property {string} */
  appInsights?: string;
}

/**
 * Represents the application Azure configuration
 * @class
 */
export class Azure {
  /** The config connection string */
  private _busConnectionString = config.get<string>('azure.bus_connection_string');

  /** The config connection string */
  private _appInsights = config.get<string>('azure.app_insights');

  /** Gets the connection string. @property {string} */
  get busConnectionString() {
    return <string>process.env.AZURE_SERVICEBUS_CONNECTION_STRING || this._busConnectionString;
  }
  
  /** Sets the connection string. @property {string} */
  set busConnectionString(value: string) {
    this._busConnectionString = value;
  }

  /** Gets the application insights key. @property {string} */
  get appInsights() {
    return <string>process.env.AZURE_APP_INSIGHTS || this._appInsights;
  }
  
  /** Sets the application insights key. @property {string} */
  set appInsights(value: string) {
    this._appInsights = value;
  }

  /**
   * Initializes the bus service configuration
   * @method
   * @param {IBus} options The bus service configuration options.
   */
  initialize(options: IAzure) {
    this.busConnectionString = options.busConnectionString || this.busConnectionString;
    this.appInsights = options.appInsights || this.appInsights;
  }
}
