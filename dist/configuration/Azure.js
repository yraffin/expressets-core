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
        /** The b2c client identifier string */
        this._b2cClientId = config.get('azure.b2c.clientId');
        /** The b2c tenant name string */
        this._b2cTenantName = config.get('azure.b2c.tenantName');
        /** The config b2c return url string */
        this._b2cReturnUrl = config.get('azure.b2c.returnUrl');
        /** The config b2c secret string */
        this._b2cSecret = config.get('azure.b2c.secret');
        /** The config b2c signin strategy string */
        this._b2cSigninStrategy = config.get('azure.b2c.signinStrategy');
        /** The config b2c scope string */
        this._b2cScope = config.get('azure.b2c.scope').split(',');
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
    /** Gets the b2c client identifier. @property {string} */
    get b2cClientId() {
        return process.env.AZURE_B2C_CLIENT_ID || this._b2cClientId;
    }
    /** Sets the b2c client identifier. @property {string} */
    set b2cClientId(value) {
        this._b2cClientId = value;
    }
    /** Gets the B2C tenant name. @property {string} */
    get b2cTenantName() {
        return process.env.AZURE_B2C_TENANT_NAME || this._b2cTenantName;
    }
    /** Sets the B2C tenant name. @property {string} */
    set b2cTenantName(value) {
        this._b2cTenantName = value;
    }
    /** Gets the B2C return url. @property {string} */
    get b2cReturnUrl() {
        return process.env.AZURE_B2C_RETURN_URL || this._b2cReturnUrl;
    }
    /** Sets the B2C return url. @property {string} */
    set b2cReturnUrl(value) {
        this._b2cReturnUrl = value;
    }
    /** Gets the B2C secret key. @property {string} */
    get b2cSecret() {
        return process.env.AZURE_B2C_SECRET || this._b2cSecret;
    }
    /** Sets the B2C secret key. @property {string} */
    set b2cSecret(value) {
        this._b2cSecret = value;
    }
    /** Gets the B2C signin strategy. @property {string} */
    get b2cSigninStrategy() {
        return process.env.AZURE_B2C_SIGNIN_STRATEGY || this._b2cSigninStrategy;
    }
    /** Sets the B2C signin strategy. @property {string} */
    set b2cSigninStrategy(value) {
        this._b2cSigninStrategy = value;
    }
    /** Gets the B2C scope. @property {string[]} */
    get b2cScope() {
        return process.env.AZURE_B2C_SCOPE ? process.env.AZURE_B2C_SCOPE.split(',') : this._b2cScope;
    }
    /** Sets the B2C scope. @property {string[]} */
    set b2cScope(value) {
        this._b2cScope = value;
    }
    /**
     * Initializes the bus service configuration
     * @method
     * @param {IBus} options The bus service configuration options.
     */
    initialize(options) {
        this.busConnectionString = options.busConnectionString || this.busConnectionString;
        this.appInsights = options.appInsights || this.appInsights;
        this.b2cClientId = options.b2cClientId || this.b2cClientId;
        this.b2cSecret = options.b2cSecret || this.b2cSecret;
        this.b2cReturnUrl = options.b2cReturnUrl || this.b2cReturnUrl;
        this.b2cTenantName = options.b2cTenantName || this.b2cTenantName;
        this.b2cSigninStrategy = options.b2cSigninStrategy || this.b2cSigninStrategy;
        this.b2cScope = options.b2cScope || this.b2cScope;
    }
}
exports.Azure = Azure;
//# sourceMappingURL=Azure.js.map