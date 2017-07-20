"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const io = require("socket.io");
const glob = require("glob");
const path = require("path");
const MetadataRegistry_1 = require("event-dispatch/MetadataRegistry");
const typedi_1 = require("typedi");
const logging_1 = require("../core/logging");
const configuration_1 = require("../configuration");
class Socket {
    /**
     * Setup the socket server on express application.
     * @method
     * @param {Application} app The express application.
     */
    setupSockets(app) {
        const serverConf = typedi_1.Container.get(configuration_1.ServerConf);
        // include subscribers dynamically
        const files = glob.sync(serverConf.distPath + '/**/*Subscriber.js');
        files.map((f) => require(path.resolve(f)));
        const options = {
            origins: serverConf.socketOrigins,
            path: `${serverConf.routePrefix}-socket`
        };
        const server = io(app, options);
        server.use(this.setupSocketAuthentication);
        server.on('connection', (socket) => {
            logging_1.logger.info('Web Sockets initalized');
            // const userId = socket.request.session.passport.user;
            socket.on('disconnecting', (reason) => {
                logging_1.logger.info('Web Socket disconnecting...');
                logging_1.logger.debug(reason);
            });
            socket.on('disconnect', (reason) => {
                logging_1.logger.info('Web Socket disconnected');
                logging_1.logger.debug(reason);
            });
            // bind applicable subscribers to the socket
            MetadataRegistry_1.defaultMetadataRegistry
                .collectEventsHandlers
                .forEach((eventHandler) => {
                const eventNamesForThisHandler = Object.keys(eventHandler);
                eventNamesForThisHandler.forEach((eventName) => {
                    const callback = eventHandler[eventName];
                    socket.on(eventName, (data) => {
                        logging_1.logger.debug(`Socket emitting event '${eventName}'`);
                        logging_1.logger.debug(data);
                        callback({ socket, data });
                    });
                });
            });
        });
        return io;
    }
    setupSocketAuthentication(socket, next) {
        next();
    }
}
exports.Socket = Socket;
//# sourceMappingURL=Socket.js.map