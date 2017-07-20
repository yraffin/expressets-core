import * as io from 'socket.io';
import * as glob from 'glob';
import * as path from 'path';
import { defaultMetadataRegistry } from 'event-dispatch/MetadataRegistry';
import { Container } from 'typedi';

import { logger } from '../core/logging';
import { ServerConf } from '../configuration';

export class Socket {
  /**
   * Setup the socket server on express application.
   * @method
   * @param {Application} app The express application.
   */
  setupSockets(app) {
    const serverConf = Container.get(ServerConf);

    // include subscribers dynamically
    const files = glob.sync(serverConf.distPath + '/**/*Subscriber.js');
    files.map((f) => require(path.resolve(f)));

    const options: SocketIO.ServerOptions = {
      origins: serverConf.socketOrigins,
      path: `${serverConf.routePrefix}-socket`
    };

    const server = io(app, options);

    server.use(this.setupSocketAuthentication);

    server.on('connection', (socket) => {
      logger.info('Web Sockets initalized');
      // const userId = socket.request.session.passport.user;

      socket.on('disconnecting', (reason) => {
        logger.info('Web Socket disconnecting...');
        logger.debug(reason);
      });

      socket.on('disconnect', (reason) => {
        logger.info('Web Socket disconnected');
        logger.debug(reason);
      });

      // bind applicable subscribers to the socket
      defaultMetadataRegistry
        .collectEventsHandlers
        .forEach((eventHandler) => {
          const eventNamesForThisHandler = Object.keys(eventHandler);
          eventNamesForThisHandler.forEach((eventName) => {
            const callback = eventHandler[eventName];
            socket.on(eventName, (data) => {
              logger.debug(`Socket emitting event '${eventName}'`);
              logger.debug(data);
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
