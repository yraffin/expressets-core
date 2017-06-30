"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const health = require("express-ping");
const helmet = require("helmet");
const compression = require("compression");
const glob = require("glob");
const typedi_1 = require("typedi");
const routing_controllers_1 = require("routing-controllers");
const Logging_1 = require("./Logging");
const Swagger_1 = require("./Swagger");
const authentication_1 = require("./authentication");
const configuration_1 = require("../configuration");
class ExpressConfig {
    constructor() {
        this.app = express();
        Swagger_1.setupSwagger(this.app);
        Logging_1.setupLogging(this.app);
        authentication_1.setupAuth(this.app);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(health.ping());
        // use compression
        this.app.use(compression());
        this.setupControllers();
    }
    setupControllers() {
        const server = typedi_1.Container.get(configuration_1.ServerConf);
        // gets specifical directories
        const controllerDirs = glob.sync(path.resolve(server.distPath + '/**/*Controller.js'));
        const middlewaresDirs = glob.sync(path.resolve(server.distPath + '/**/*Middleware.js'));
        routing_controllers_1.useExpressServer(this.app, {
            // defaultErrorHandler: false,
            routePrefix: server.routePrefix,
            controllers: controllerDirs,
            middlewares: middlewaresDirs
        });
    }
}
exports.ExpressConfig = ExpressConfig;
//# sourceMappingURL=Express.js.map