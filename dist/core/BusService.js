"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const azure = require("azure");
const configuration_1 = require("../configuration");
const logging_1 = require("../core/logging");
const request = 'request';
const response = 'response';
/**
 * Represents the base mongo service.
 * @class
 */
let BusService = class BusService {
    constructor(name) {
        this.name = name;
        const config = typedi_1.Container.get(configuration_1.Bus);
        this.serviceBus = azure.createServiceBusService(config.connectionString);
        this.serviceBus.createQueueIfNotExists(this.nameRequest, (error) => {
            this.logError(`Connection to Azure Service Bus '${this.nameRequest}'`, error);
        });
        this.serviceBus.createQueueIfNotExists(this.nameResponse, (error) => {
            this.logError(`Connection to Azure Service Bus '${this.nameRequest}'`, error);
        });
        this.receiveMessage(this.onReceiveMessage);
        logging_1.logger.info(`Bus '${this.name}' Instancied`);
    }
    /** name request queue */
    get nameRequest() {
        return this.name + request;
    }
    ;
    /** name request queue */
    get nameResponse() {
        return this.name + response;
    }
    /** Utils to send message */
    sendMessage(message) {
        this.serviceBus.sendQueueMessage(this.isSender ? this.nameRequest : this.nameResponse, message, (error) => {
            this.logError(`Message sent to queue '${this.isSender ? this.nameRequest : this.nameResponse}'`, error);
            logging_1.logger.debug('Message sent:', message);
        });
    }
    /** Utils to recive message */
    receiveMessage(callback) {
        this.serviceBus.receiveQueueMessage(this.isSender ? this.nameResponse : this.nameRequest, (error, message) => {
            if (message) {
                callback(message);
            }
            this.receiveMessage(this.onReceiveMessage);
            // this.logError(`Message received from queue '${this.isSender ? this.nameResponse : this.nameRequest}'`, error);
            // logger.debug('Message received:', message);
        });
    }
    /**
     * Log an error if occurred.
     * @method
     * @param {string} message The message to log on error.
     * @param {any} error The current error.
     */
    logError(message, error) {
        if (!error) {
            logging_1.logger.debug(`${message} succeeded.`);
            return;
        }
        logging_1.logger.error(message, error.message);
        logging_1.logger.debug(error);
    }
};
BusService = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [String])
], BusService);
exports.BusService = BusService;
//# sourceMappingURL=BusService.js.map