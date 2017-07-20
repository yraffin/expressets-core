"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston = require("winston");
const config = require("config");
const expressWinston = require("express-winston");
const logging_1 = require("../core/logging");
const level = process.env.LOG_LEVEL || config.get('loglevel');
function setupLogging(app) {
    // Development Logger
    // const env = config.util.getEnv('NODE_ENV');
    if (level === 'info') {
        logging_1.logger.add(winston.transports.Console, {
            type: 'verbose',
            colorize: true,
            prettyPrint: true,
            handleExceptions: true,
            humanReadableUnhandledException: true
        });
    }
    setupExpress(app);
}
exports.setupLogging = setupLogging;
function setupExpress(app) {
    // error logging
    if (level === 'debug') {
        app.use(expressWinston.errorLogger({
            transports: [
                new winston.transports.Console({
                    json: true,
                    colorize: true
                })
            ]
        }));
    }
    // request logging
    if (level === 'info') {
        app.use(expressWinston.logger({
            transports: [
                new winston.transports.Console({
                    json: true,
                    colorize: true
                })
            ]
        }));
    }
}
//# sourceMappingURL=Logging.js.map