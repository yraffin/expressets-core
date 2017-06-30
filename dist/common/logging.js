"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston = require("winston");
exports.logger = new winston.Logger();
process.on('unhandledRejection', (reason, p) => {
    exports.logger.error('Possibly Unhandled Rejection at: Promise ', p, ' reason: ', reason);
});
process.on('uncaughtException', (err) => {
    exports.logger.error('Possibly Unhandled Exception reason: ', err);
});
//# sourceMappingURL=logging.js.map