"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const azure = require("azure");
const request = "request";
const response = "response";
/**
 * Represents the base mongo service.
 * @class
 */
let BusService = class BusService {
    constructor(name) {
        this.name = name;
        this.serviceBus = azure.createServiceBusService('Endpoint=sb://adeccotag.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=3s1kAmkUJnD3a9RwajozJv8B0mJ+07rHZG0n2Tgkuo4=');
        this.serviceBus.createQueueIfNotExists(this.nameRequest, function () { });
        this.serviceBus.createQueueIfNotExists(this.nameResponse, function () { });
        this.receiveMessage(this.onReceiveMessage);
        console.log('Bus Instancied');
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
        this.serviceBus.sendQueueMessage(this.isSender ? this.nameRequest : this.nameResponse, message, function () { });
    }
    /** Utils to recive message */
    receiveMessage(callback) {
        this.serviceBus.receiveQueueMessage(this.isSender ? this.nameResponse : this.nameRequest, (error, message) => {
            if (message) {
                callback(message);
            }
            this.receiveMessage(this.onReceiveMessage);
        });
    }
};
BusService = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [String])
], BusService);
exports.BusService = BusService;
//# sourceMappingURL=BusService.js.map