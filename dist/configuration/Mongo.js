"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = require("config");
/**
 * Represents the application mongo config
 * @class
 */
class Mongo {
    constructor() {
        /** The config db name */
        this._db = config.get('mongo.db');
        /** The config user */
        this._user = config.get('mongo.user');
        /** The config password */
        this._password = config.get('mongo.password');
        /** The config replica */
        this._replica = config.get('mongo.replica');
        /** The config servers */
        this._servers = config.get('mongo.servers');
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
    }
}
exports.Mongo = Mongo;
//# sourceMappingURL=Mongo.js.map