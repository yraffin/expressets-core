"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = require("config");
/**
 * Represents the application mongo config
 * @class
 */
class Mongo {
    constructor() {
        /** The config db name @property {string} */
        this._db = config.get('mongo.db');
        /** The config user @property {string} */
        this._user = config.get('mongo.user');
        /** The config password @property {string} */
        this._password = config.get('mongo.password');
        /** The config replica @property {string} */
        this._replica = config.get('mongo.replica');
        /** The config servers @property {string} */
        this._servers = config.get('mongo.servers');
        /** The value indicating whether to use mongodb session store @property {boolean} */
        this._useSessionStore = config.get('mongo.useSessionStore');
        /** The config session secret @property {string} */
        this._sessionSecret = 'Mongo session secret';
        /** The config session max age @property {number} */
        this._sessionMaxAge = 24 * 60 * 60; // 1 day in second
    }
    /** Gets the db name. @property {string} */
    get db() {
        return process.env.DB || this._db;
    }
    /** Sets the db name. @property {string} */
    set db(value) {
        this._db = value;
    }
    /** Gets the user. @property {string} */
    get user() {
        return process.env.DB_USER || this._user;
    }
    /** Sets the user. @property {string} */
    set user(value) {
        this._user = value;
    }
    /** Gets the password. @property {string} */
    get password() {
        return process.env.DB_PASSWORD || this._password;
    }
    /** Sets the password. @property {string} */
    set password(value) {
        this._password = value;
    }
    /** Gets the replica. @property {string} */
    get replica() {
        return process.env.DB_REPLICA || this._replica;
    }
    /** Sets the replica. @property {string} */
    set replica(value) {
        this._replica = value;
    }
    /** Gets the session secret. @property {string} */
    get sessionSecret() {
        return process.env.DB_SESSION_SECRET || this._sessionSecret;
    }
    /** Sets the session secret. @property {string} */
    set sessionSecret(value) {
        this._sessionSecret = value;
    }
    /** Gets the session max age. @property {number} */
    get sessionMaxAge() {
        return process.env.DB_SESSION_MAX_AGE ? parseInt(process.env.DB_SESSION_MAX_AGE, 10) : this._sessionMaxAge;
    }
    /** Sets the session mas age. @property {number} */
    set sessionMaxAge(value) {
        this._sessionMaxAge = value;
    }
    /** Gets the a value indicating whether to use session store. @property {boolean} */
    get useSessionStore() {
        return process.env.DB_SESSION_STORE ?
            (['true', '1'].indexOf(process.env.DB_SESSION_STORE.toLowerCase()) > -1) : this._useSessionStore;
    }
    /** Sets the a value indicating whether to use session store. @property {boolean} */
    set useSessionStore(value) {
        this._useSessionStore = value;
    }
    /** Gets the servers. @property {string} */
    get servers() {
        return process.env.DB_SERVERS || this._servers;
    }
    /** Sets the servers. @property {string} */
    set servers(value) {
        this._servers = value;
    }
    /**
     * Initializes the Mongo configuration
     * @method
     * @param {IMongo} options The ports configuration options.
     */
    initialize(options) {
        this.db = options.db || this.db;
        this.user = options.user || this.user;
        this.password = options.password || this.password;
        this.replica = options.replica || this.replica;
        this.servers = options.servers || this.servers;
        this.useSessionStore = options.useSessionStore || this.useSessionStore;
        this.sessionSecret = options.sessionSecret || this.sessionSecret;
        this.sessionMaxAge = options.sessionMaxAge || this.sessionMaxAge;
    }
}
exports.Mongo = Mongo;
//# sourceMappingURL=Mongo.js.map