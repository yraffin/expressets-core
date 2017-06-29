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
export declare class Ports {
    /** The config http port */
    private _port;
    /** The config http debug port */
    private _debug;
    /** Gets the http port. @property {number} */
    /** Sets the http port. @property {number} */
    http: number;
    /** Gets the debug port. @property {number} */
    /** Sets the debug port. @property {number} */
    debug: number;
    /**
     * Initializes the Ports configuration
     * @method
     * @param {IPorts} options The ports configuration options.
     */
    initialize(options: IPorts): void;
}
