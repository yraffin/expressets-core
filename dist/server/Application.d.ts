import { Db } from 'mongodb';
import { ExpressConfig } from './Express';
import { Mongo } from './Mongo';
import { AppConfig } from '../configuration';
/**
 * Represents the application.
 * @class
 */
export declare class Application {
    /** The express http server. @property {http.Server} */
    server: any;
    /** The express configuration @property {ExpressConfig} */
    express: ExpressConfig;
    /** The mongo client @property {Mongo} */
    mongo: Mongo;
    /**
     * Initializes a new instance of the Application class.
     * @constructor
     * @param {AppConfig} options The application aconfiguration options.
     */
    constructor(options?: AppConfig);
    /**
     * Start the application.
     * @async
     * @method
     */
    start(): Promise<void>;
    /**
     * Close the application.
     * @method
     * @returns {Promise<void>}
     */
    close(): Promise<void>;
    /**
     * Create the database connection.
     * @method
     * @returns {Promise<Db>}
     */
    createDbConnection(): Promise<Db>;
}
