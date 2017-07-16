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

  /** The b2c client identifier string */
  b2cClientId?: string;

  /** The b2c tenant name string */
  b2cTenantName?: string;

  /** The config b2c return url string */
  b2cReturnUrl?: string;

  /** The config b2c secret string */
  b2cSecret?: string;

  /** The config b2c signin strategy string */
  b2cSigninStrategy?: string;

  /** The config b2c scope string */
  b2cScope?: string[];
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

  /** The b2c client identifier string */
  private _b2cClientId = config.get<string>('azure.b2c.clientId');

  /** The b2c tenant name string */
  private _b2cTenantName = config.get<string>('azure.b2c.tenantName');

  /** The config b2c return url string */
  private _b2cReturnUrl = config.get<string>('azure.b2c.returnUrl');

  /** The config b2c secret string */
  private _b2cSecret = config.get<string>('azure.b2c.secret');

  /** The config b2c signin strategy string */
  private _b2cSigninStrategy = config.get<string>('azure.b2c.signinStrategy');

  /** The config b2c scope string */
  private _b2cScope = config.get<string>('azure.b2c.scope').split(',');

  /** Gets the connection string. @property {string} */
  get busConnectionString() {
    return process.env.AZURE_SERVICEBUS_CONNECTION_STRING as string || this._busConnectionString;
  }
  
  /** Sets the connection string. @property {string} */
  set busConnectionString(value: string) {
    this._busConnectionString = value;
  }

  /** Gets the application insights key. @property {string} */
  get appInsights() {
    return process.env.AZURE_APP_INSIGHTS as string || this._appInsights;
  }
  
  /** Sets the application insights key. @property {string} */
  set appInsights(value: string) {
    this._appInsights = value;
  }

  /** Gets the b2c client identifier. @property {string} */
  get b2cClientId() {
    return process.env.AZURE_B2C_CLIENT_ID as string || this._b2cClientId;
  }
  
  /** Sets the b2c client identifier. @property {string} */
  set b2cClientId(value: string) {
    this._b2cClientId = value;
  }

  /** Gets the B2C tenant name. @property {string} */
  get b2cTenantName() {
    return process.env.AZURE_B2C_TENANT_NAME as string || this._b2cTenantName;
  }
  
  /** Sets the B2C tenant name. @property {string} */
  set b2cTenantName(value: string) {
    this._b2cTenantName = value;
  }

  /** Gets the B2C return url. @property {string} */
  get b2cReturnUrl() {
    return process.env.AZURE_B2C_RETURN_URL as string || this._b2cReturnUrl;
  }
  
  /** Sets the B2C return url. @property {string} */
  set b2cReturnUrl(value: string) {
    this._b2cReturnUrl = value;
  }

  /** Gets the B2C secret key. @property {string} */
  get b2cSecret() {
    return process.env.AZURE_B2C_SECRET as string || this._b2cSecret;
  }
  
  /** Sets the B2C secret key. @property {string} */
  set b2cSecret(value: string) {
    this._b2cSecret = value;
  }

  /** Gets the B2C signin strategy. @property {string} */
  get b2cSigninStrategy() {
    return process.env.AZURE_B2C_SIGNIN_STRATEGY as string || this._b2cSigninStrategy;
  }
  
  /** Sets the B2C signin strategy. @property {string} */
  set b2cSigninStrategy(value: string) {
    this._b2cSigninStrategy = value;
  }

  /** Gets the B2C scope. @property {string[]} */
  get b2cScope() {
    return (process.env.AZURE_B2C_SCOPE as string).split(',') || this._b2cScope;
  }
  
  /** Sets the B2C scope. @property {string[]} */
  set b2cScope(value: string[]) {
    this._b2cScope = value;
  }

  /**
   * Initializes the bus service configuration
   * @method
   * @param {IBus} options The bus service configuration options.
   */
  initialize(options: IAzure) {
    this.busConnectionString = options.busConnectionString || this.busConnectionString;
    this.appInsights = options.appInsights || this.appInsights;
    this.b2cClientId = options.b2cClientId || this.b2cClientId;
    this.b2cSecret = options.b2cSecret || this.b2cSecret;
    this.b2cReturnUrl = options.b2cReturnUrl || this.b2cReturnUrl;
    this.b2cTenantName = options.b2cTenantName || this.b2cTenantName;
    this.b2cSigninStrategy = options.b2cSigninStrategy || this.b2cSigninStrategy;
    this.b2cScope = options.b2cScope || this.b2cScope;
  }
}
