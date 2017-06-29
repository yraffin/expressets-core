import * as io from 'socket.io';
import * as passport from 'passport';
import * as glob from 'glob';
import * as path from 'path';
import { defaultMetadataRegistry } from 'event-dispatch/MetadataRegistry';
import { Container } from 'typedi';

import { logger } from '../common/logging';
import { ServerConf } from '../configuration';

/**
 * Setup the socket server on express application.
 * @method
 * @param {Application} app The express application.
 */
export function setupSockets(app) {
  const serverConf = Container.get(ServerConf);

  // include subscribers dynamically
  const files = glob.sync(serverConf.distPath + '/**/*Subscriber.js');
  files.map(f => { return require(path.resolve(f)); });

  let server = io(app);

  server.use((socket, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err) next(new Error('Error in passport authenticate'));
      if (!user) next(new Error('Failed to authenticate oAuth token'));
      socket.request.user = user;
      return next();
    })(socket.request, null, next);
  });

  server.on('connection', (socket) => {
    logger.info('Web Sockets initalized');
    // const userId = socket.request.session.passport.user;

    // bind applicable subscribers to the socket
    defaultMetadataRegistry
      .collectEventsHandlers
      .forEach(eventHandler => {
        const eventNamesForThisHandler = Object.keys(eventHandler);
        eventNamesForThisHandler.forEach(eventName => {
          const callback = eventHandler[eventName];
          socket.on(eventName, (data) => {
            callback(Object.assign({ socket }, data));
          });
        });
      });
  });

  return io;
};
