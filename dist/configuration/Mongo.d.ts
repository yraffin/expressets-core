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
    /** Gets or sets a value indicating whether to use mongodb session store. @property {boolean} */
    useSessionStore?: boolean;
    /** Gets or sets the session secret. @property {string} */
    sessionSecret?: string;
    /** Gets or sets the session max age. @property {number} */
    sessionMaxAge?: number;
}
/**
 * Represents the application mongo config
 * @class
 */
export declare class Mongo {
    /** The config db name @property {string} */
    private _db;
    /** The config user @property {string} */
    private _user;
    /** The config password @property {string} */
    private _password;
    /** The config replica @property {string} */
    private _replica;
    /** The config servers @property {string} */
    private _servers;
    /** The value indicating whether to use mongodb session store @property {boolean} */
    private _useSessionStore;
    /** The config session secret @property {string} */
    private _sessionSecret;
    /** The config session max age @property {number} */
    private _sessionMaxAge;
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
    /** Gets the session secret. @property {string} */
    /** Sets the session secret. @property {string} */
    sessionSecret: string;
    /** Gets the session max age. @property {number} */
    /** Sets the session mas age. @property {number} */
    sessionMaxAge: number;
    /** Gets the a value indicating whether to use session store. @property {boolean} */
    /** Sets the a value indicating whether to use session store. @property {boolean} */
    useSessionStore: boolean;
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
