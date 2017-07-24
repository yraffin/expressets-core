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
    /** Gets or sets a value indicating whether server is launch for testing. @property {boolean} */
    isTesting?: boolean;
}
/**
 * Represents the application server configuration
 * @class
 */
export declare class ServerConf {
    /** The config dist path */
    distPath: string;
    /** The config routePrefix path */
    routePrefix: string;
    /** The ssl key file */
    fsSslKey: any;
    /** The ssl key crt */
    fsSslCrt: any;
    /** The socket origins */
    private _socketOrigins;
    /** Gets or sets a value indicating whether server is launch for testing. @property {boolean} */
    private _isTesting;
    /** Gets a value indicating whether server is launch for testing. @property {boolean} */
    /** Sets a value indicating whether server is launch for testing. @property {boolean} */
    isTesting: boolean;
    /** Gets the socket origins. @property {string} */
    /** Sets the socket origins. @property {string} */
    socketOrigins: string;
    /**
     * Gets the ssl config for http2
     * @method
     */
    readonly ssl: {
        key: any;
        cert: any;
    };
    /**
     * Initializes the server configuration
     * @method
     * @param {IServerConf} options The server configuration options.
     */
    initialize(options: IServerConf): void;
}
