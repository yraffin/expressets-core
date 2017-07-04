"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = require("config");
/**
 * Represents the application bus service configuration
 * @class
 */
class Bus {
    constructor() {
        /** The config connection string */
        this._connectionString = config.get('bus.connection_string');
    }
    /** Gets the connection string. @property {string} */
    get connectionString() {
        return process.env.AZURE_SERVICEBUS_CONNECTION_STRING || this._connectionString;
    }
    /** Sets the connection string. @property {string} */
    set connectionString(value) {
        this._connectionString = value;
    }
    /**
     * Initializes the bus service configuration
     * @method
     * @param {IBus} options The bus service configuration options.
     */
    initialize(options) {
        this.connectionString = options.connectionString || this.connectionString;
    }
}
exports.Bus = Bus;
//# sourceMappingURL=Bus.js.map