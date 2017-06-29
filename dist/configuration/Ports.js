"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = require("config");
/**
 * Represents the application ports
 * @class
 */
class Ports {
    constructor() {
        /** The config http port */
        this._port = config.get('ports.http');
        /** The config http debug port */
        this._debug = config.get('ports.debug');
    }
    /** Gets the http port. @property {number} */
    get http() {
        return process.env.PORT || this._port;
    }
    /** Sets the http port. @property {number} */
    set http(value) {
        this._port = value;
    }
    /** Gets the debug port. @property {number} */
    get debug() {
        return process.env.PORT_DEBUG || this._debug;
    }
    /** Sets the debug port. @property {number} */
    set debug(value) {
        this._debug = value;
    }
    /**
     * Initializes the Ports configuration
     * @method
     * @param {IPorts} options The ports configuration options.
     */
    initialize(options) {
        this.http = options.http || this.http;
        this.debug = options.debug || this.debug;
    }
}
exports.Ports = Ports;
//# sourceMappingURL=Ports.js.map