"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = require("config");
const fs = require("fs");
/**
 * Represents the application server configuration
 * @class
 */
class ServerConf {
    constructor() {
        /** The config dist path */
        this.distPath = './dist';
        /** The config routePrefix path */
        this.routePrefix = '/api';
        /** The socket origins */
        this._socketOrigins = config.get('socket_origins') || '*:*';
        /** Gets or sets a value indicating whether server is launch for testing. @property {boolean} */
        this._isTesting = false;
    }
    /** Gets a value indicating whether server is launch for testing. @property {boolean} */
    get isTesting() {
        return this._isTesting;
    }
    /** Sets a value indicating whether server is launch for testing. @property {boolean} */
    set isTesting(value) {
        this._isTesting = value;
    }
    /** Gets the socket origins. @property {string} */
    get socketOrigins() {
        return process.env.SOCKET_ORIGINS || this._socketOrigins;
    }
    /** Sets the socket origins. @property {string} */
    set socketOrigins(value) {
        this._socketOrigins = value;
    }
    /**
     * Gets the ssl config for http2
     * @method
     */
    get ssl() {
        if (!process.env.SSL_KEY || !process.env.SSL_CRT) {
            return null;
        }
        if (!fs.existsSync(process.env.SSL_KEY) || !fs.existsSync(process.env.SSL_CRT)) {
            return null;
        }
        if (!this.fsSslKey) {
            this.fsSslKey = fs.readFileSync(process.env.SSL_KEY);
        }
        if (!this.fsSslCrt) {
            this.fsSslCrt = fs.readFileSync(process.env.SSL_CRT);
        }
        return {
            key: this.fsSslKey,
            cert: this.fsSslCrt
        };
    }
    /**
     * Initializes the server configuration
     * @method
     * @param {IServerConf} options The server configuration options.
     */
    initialize(options) {
        this.distPath = options.distPath || this.distPath;
        this.routePrefix = options.routePrefix || this.routePrefix;
        this.socketOrigins = options.socketOrigins || this.socketOrigins;
        this.isTesting = options.isTesting || this.isTesting;
    }
}
exports.ServerConf = ServerConf;
//# sourceMappingURL=ServerConf.js.map