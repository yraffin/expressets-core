"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const io = require("socket.io");
const passport = require("passport");
const glob = require("glob");
const path = require("path");
const MetadataRegistry_1 = require("event-dispatch/MetadataRegistry");
const typedi_1 = require("typedi");
const logging_1 = require("../common/logging");
const configuration_1 = require("../configuration");
/**
 * Setup the socket server on express application.
 * @method
 * @param {Application} app The express application.
 */
function setupSockets(app) {
    const serverConf = typedi_1.Container.get(configuration_1.ServerConf);
    // include subscribers dynamically
    const files = glob.sync(serverConf.distPath + '/**/*Subscriber.js');
    files.map(f => { return require(path.resolve(f)); });
    let server = io(app);
    server.use((socket, next) => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            if (err)
                next(new Error('Error in passport authenticate'));
            if (!user)
                next(new Error('Failed to authenticate oAuth token'));
            socket.request.user = user;
            return next();
        })(socket.request, null, next);
    });
    server.on('connection', (socket) => {
        logging_1.logger.info('Web Sockets initalized');
        // const userId = socket.request.session.passport.user;
        // bind applicable subscribers to the socket
        MetadataRegistry_1.defaultMetadataRegistry
            .collectEventsHandlers
            .forEach(eventHandler => {
            const eventNamesForThisHandler = Object.keys(eventHandler);
            eventNamesForThisHandler.forEach(eventName => {
                const callback = eventHandler[eventName];
                socket.on(eventName, (data) => {
                    callback({ socket, data });
                });
            });
        });
    });
    return io;
}
exports.setupSockets = setupSockets;
;
//# sourceMappingURL=Socket.js.map