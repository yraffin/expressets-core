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
export declare class Auth {
    /** The config jwt secret */
    private _jwtSecret;
    /** Gets the jwt secret. @property {string} */
    /** Sets the jwt secret. @property {string} */
    jwtSecret: string;
    /**
     * Initializes the authentication configuration
     * @method
     * @param {IAuth} options The authentication configuration options.
     */
    initialize(options: IAuth): void;
}
