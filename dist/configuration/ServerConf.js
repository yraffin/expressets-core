"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    }
    /**
     * Initializes the server configuration
     * @method
     * @param {IServerConf} options The server configuration options.
     */
    initialize(options) {
        this.distPath = options.distPath || this.distPath;
        this.routePrefix = options.routePrefix || this.routePrefix;
    }
}
exports.ServerConf = ServerConf;
//# sourceMappingURL=ServerConf.js.map