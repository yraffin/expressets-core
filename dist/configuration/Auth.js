"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = require("config");
/**
 * Represents the application authentication configuration
 * @class
 */
class Auth {
    constructor() {
        /** The config jwt secret */
        this._jwtSecret = config.get('auth.jwt_secret');
    }
    /** Gets the jwt secret. @property {string} */
    get jwtSecret() {
        return process.env.JWT_SECRET || this._jwtSecret;
    }
    /** Sets the jwt secret. @property {string} */
    set jwtSecret(value) {
        this._jwtSecret = value;
    }
    /**
     * Initializes the authentication configuration
     * @method
     * @param {IAuth} options The authentication configuration options.
     */
    initialize(options) {
        this.jwtSecret = options.jwtSecret || this.jwtSecret;
    }
}
exports.Auth = Auth;
//# sourceMappingURL=Auth.js.map