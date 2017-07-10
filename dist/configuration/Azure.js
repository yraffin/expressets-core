"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = require("config");
/**
 * Represents the application Azure configuration
 * @class
 */
class Azure {
    constructor() {
        /** The config connection string */
        this._busConnectionString = config.get('azure.bus_connection_string');
        /** The config connection string */
        this._appInsights = config.get('azure.app_insights');
    }
    /** Gets the connection string. @property {string} */
    get busConnectionString() {
        return process.env.AZURE_SERVICEBUS_CONNECTION_STRING || this._busConnectionString;
    }
    /** Sets the connection string. @property {string} */
    set busConnectionString(value) {
        this._busConnectionString = value;
    }
    /** Gets the application insights key. @property {string} */
    get appInsights() {
        return process.env.AZURE_APP_INSIGHTS || this._appInsights;
    }
    /** Sets the application insights key. @property {string} */
    set appInsights(value) {
        this._appInsights = value;
    }
    /**
     * Initializes the bus service configuration
     * @method
     * @param {IBus} options The bus service configuration options.
     */
    initialize(options) {
        this.busConnectionString = options.busConnectionString || this.busConnectionString;
        this.appInsights = options.appInsights || this.appInsights;
    }
}
exports.Azure = Azure;
//# sourceMappingURL=Azure.js.map