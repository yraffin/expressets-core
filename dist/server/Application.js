"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const Express_1 = require("./Express");
const Socket_1 = require("./Socket");
const logging_1 = require("../common/logging");
const Mongo_1 = require("./Mongo");
const configuration_1 = require("../configuration");
/**
 * Represents the application.
 * @class
 */
class Application {
    /**
     * Initializes a new instance of the Application class.
     * @constructor
     * @param {AppConfig} options The application aconfiguration options.
     */
    constructor(options) {
        configuration_1.initializeAppConfig(options);
    }
    /**
     * Start the application.
     * @async
     * @method
     */
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            // setup DI Container
            routing_controllers_1.useContainer(typedi_1.Container);
            // create mongo connection
            yield this.createDbConnection();
            // create express config
            this.express = new Express_1.ExpressConfig();
            const ports = typedi_1.Container.get(configuration_1.Ports);
            // Start Webserver
            this.server = this.express.app.listen(ports.http, () => {
                logging_1.logger.info(`
        ------------
        Server Started!

        Http: http://localhost:${ports.http}
        Debugger: http://127.0.0.1:${ports.http}/?ws=127.0.0.1:${ports.http}&port=${ports.debug}
        Health: http://localhost:${ports.http}/ping

        API Docs: http://localhost:${ports.http}/docs
        API Spec: http://localhost:${ports.http}/api-docs
        ------------
      `);
            });
            // Start Websockets
            Socket_1.setupSockets(this.server);
            // On server stop, close mongo db instance
            this.server.on('close', () => {
                if (!this.mongo) {
                    return;
                }
                this.mongo.disconnect();
            });
        });
    }
    /**
     * Create the database connection.
     * @method
     * @returns {Promise<Db>}
     */
    createDbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            this.mongo = typedi_1.Container.get(Mongo_1.Mongo);
            return this.mongo.db();
        });
    }
}
exports.Application = Application;
//# sourceMappingURL=Application.js.map