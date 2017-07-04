"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = require("config");
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
     * Initializes the server configuration
     * @method
     * @param {IServerConf} options The server configuration options.
     */
    initialize(options) {
        this.distPath = options.distPath || this.distPath;
        this.routePrefix = options.routePrefix || this.routePrefix;
        this.socketOrigins = options.socketOrigins || this.socketOrigins;
    }
}
exports.ServerConf = ServerConf;
//# sourceMappingURL=ServerConf.js.map