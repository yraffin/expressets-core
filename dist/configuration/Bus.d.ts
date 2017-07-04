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
export declare class Bus {
    /** The config connection string */
    private _connectionString;
    /** Gets the connection string. @property {string} */
    /** Sets the connection string. @property {string} */
    connectionString: string;
    /**
     * Initializes the bus service configuration
     * @method
     * @param {IBus} options The bus service configuration options.
     */
    initialize(options: IBus): void;
}
