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
export declare class ServerConf {
    /** The config dist path */
    distPath: string;
    /** The config routePrefix path */
    routePrefix: string;
    /** The socket origins */
    private _socketOrigins;
    /** Gets the socket origins. @property {string} */
    /** Sets the socket origins. @property {string} */
    socketOrigins: string;
    /**
     * Initializes the server configuration
     * @method
     * @param {IServerConf} options The server configuration options.
     */
    initialize(options: IServerConf): void;
}
