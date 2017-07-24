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
const session = require("express-session");
const connectMongo = require("connect-mongo");
const Logging_1 = require("./Logging");
const Swagger_1 = require("./Swagger");
const Authentication_1 = require("./Authentication");
const Mongo_1 = require("./Mongo");
const configuration_1 = require("../configuration");
const ErrorHandlerMiddleware_1 = require("../core/ErrorHandlerMiddleware");
class ExpressConfig {
    constructor() {
        this.app = express();
        // setup auth
        const swagger = typedi_1.Container.get(Swagger_1.Swagger);
        swagger.setupSwagger(this.app);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(health.ping());
        // use compression
        this.app.use(compression());
        // use session
        const mongoConf = typedi_1.Container.get(configuration_1.Mongo);
        const mongo = typedi_1.Container.get(Mongo_1.Mongo);
        if (mongoConf.useSessionStore) {
            const mongoStore = connectMongo(session);
            const store = new mongoStore({
                db: mongo.getDb(),
                clear_interval: mongoConf.sessionMaxAge
            });
            this.app.use(session({
                secret: mongoConf.sessionSecret,
                saveUninitialized: true,
                resave: true,
                cookie: { maxAge: mongoConf.sessionMaxAge * 1000 },
                store,
            }));
        }
        // setup auth
        const authentication = typedi_1.Container.get(Authentication_1.Authentication);
        authentication.setupAuth(this.app);
        this.setupControllers();
        Logging_1.setupLogging(this.app);
    }
    setupControllers() {
        const server = typedi_1.Container.get(configuration_1.ServerConf);
        // gets specifical directories
        const controllerDirs = glob.sync(path.resolve(server.distPath + '/**/*Controller.js'));
        const middlewaresDirs = glob.sync(path.resolve(server.distPath + '/**/*Middleware.js'));
        const middlewaresFuncDirs = middlewaresDirs.map((f) => require(f));
        middlewaresFuncDirs.push(ErrorHandlerMiddleware_1.ErrorHandlerMiddleware);
        routing_controllers_1.useExpressServer(this.app, {
            defaultErrorHandler: false,
            routePrefix: server.routePrefix,
            controllers: controllerDirs,
            middlewares: middlewaresFuncDirs
        });
    }
}
exports.ExpressConfig = ExpressConfig;
//# sourceMappingURL=Express.js.map