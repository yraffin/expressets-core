"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const Ports_1 = require("./Ports");
exports.Ports = Ports_1.Ports;
const Auth_1 = require("./Auth");
exports.Auth = Auth_1.Auth;
const Mongo_1 = require("./Mongo");
exports.Mongo = Mongo_1.Mongo;
const ServerConf_1 = require("./ServerConf");
exports.ServerConf = ServerConf_1.ServerConf;
const Azure_1 = require("./Azure");
exports.Azure = Azure_1.Azure;
/**
 * Represents the application configuration options.
 * @class
 */
class AppConfig {
    /**
     * Initializes a new instance of the AppConfig class.
     * @constructor
     * @param {AppConfig} config The initial configuration.
     */
    constructor(config) {
        this.ports = config.ports;
        this.auth = config.auth;
        this.server = config.server;
        this.mongo = config.mongo;
        this.authCheck = config.authCheck;
        this.azure = config.azure;
    }
}
exports.AppConfig = AppConfig;
/**
 * Initializes the application configuration.
 * @method
 * @param {AppConfig} options The application configuration options.
 */
function initializeAppConfig(options) {
    const ports = typedi_1.Container.get(Ports_1.Ports);
    ports.initialize(options.ports || {});
    const auth = typedi_1.Container.get(Auth_1.Auth);
    auth.initialize(options.auth || {});
    const server = typedi_1.Container.get(ServerConf_1.ServerConf);
    server.initialize(options.server || {});
    const mongo = typedi_1.Container.get(Mongo_1.Mongo);
    mongo.initialize(options.mongo || {});
    const azure = typedi_1.Container.get(Azure_1.Azure);
    azure.initialize(options.azure || {});
}
exports.initializeAppConfig = initializeAppConfig;
//# sourceMappingURL=index.js.map