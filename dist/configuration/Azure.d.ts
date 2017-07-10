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
export declare class Azure {
    /** The config connection string */
    private _busConnectionString;
    /** The config connection string */
    private _appInsights;
    /** Gets the connection string. @property {string} */
    /** Sets the connection string. @property {string} */
    busConnectionString: string;
    /** Gets the application insights key. @property {string} */
    /** Sets the application insights key. @property {string} */
    appInsights: string;
    /**
     * Initializes the bus service configuration
     * @method
     * @param {IBus} options The bus service configuration options.
     */
    initialize(options: IAzure): void;
}
