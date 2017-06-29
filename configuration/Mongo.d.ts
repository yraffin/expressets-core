/**
 * Represents the Mongo interface.
 * @interface
 */
export interface IMongo {
    /** Gets or sets the db. @property {string} */
    db?: string;
    /** Gets or sets the user. @property {string} */
    user?: string;
    /** Gets or sets the password. @property {string} */
    password?: string;
    /** Gets or sets the replica. @property {string} */
    replica?: string;
    /** Gets or sets the servers. @property {string} */
    servers?: string;
}
/**
 * Represents the application mongo config
 * @class
 */
export declare class Mongo {
    /** The config db name */
    private _db;
    /** The config user */
    private _user;
    /** The config password */
    private _password;
    /** The config replica */
    private _replica;
    /** The config servers */
    private _servers;
    /** Gets the db name. @property {string} */
    /** Sets the db name. @property {string} */
    db: string;
    /** Gets the user. @property {string} */
    /** Sets the user. @property {string} */
    user: string;
    /** Gets the password. @property {string} */
    /** Sets the password. @property {string} */
    password: string;
    /** Gets the replica. @property {string} */
    /** Sets the replica. @property {string} */
    replica: string;
    /** Gets the servers. @property {string} */
    /** Sets the servers. @property {string} */
    servers: string;
    /**
     * Initializes the Mongo configuration
     * @method
     * @param {IMongo} options The ports configuration options.
     */
    initialize(options: IMongo): void;
}
