import * as config from 'config';

/**
 * Represents the authentication interface.
 * @interface
 */
export interface IAuth {
  /** Gets or sets the jwt secret. @property {jwtSecret} */
  jwtSecret?: string;
}

/**
 * Represents the application authentication configuration
 * @class
 */
export class Auth {
  /** The config jwt secret */
  private _jwtSecret = config.get<string>('auth.jwt_secret');

  /** Gets the jwt secret. @property {string} */
  get jwtSecret() {
    return process.env.JWT_SECRET as string || this._jwtSecret;
  }
  
  /** Sets the jwt secret. @property {string} */
  set jwtSecret(value: string) {
    this._jwtSecret = value;
  }

  /**
   * Initializes the authentication configuration
   * @method
   * @param {IAuth} options The authentication configuration options.
   */
  initialize(options: IAuth) {
    this.jwtSecret = options.jwtSecret || this.jwtSecret;
  }
}
