import * as http from 'http';
import * as appInsights from 'applicationinsights';
import * as spdy from 'spdy';
import { Db } from 'mongodb';
import { useContainer } from 'routing-controllers';
import { Container } from 'typedi';

import { ExpressConfig } from './Express';
import { logger } from '../core/logging';
import { Mongo } from './Mongo';
import { Ports, ServerConf, initializeAppConfig, AppConfig, Azure } from '../configuration';
import { Socket } from './Socket';

/**
 * Represents the application.
 * @class
 */
export class Application {

  /** The express http server. @property {http.Server} */
  server: any;

  /** The express configuration @property {ExpressConfig} */
  express: ExpressConfig;

  /** The mongo client @property {Mongo} */
  mongo: Mongo;

  /**
   * Initializes a new instance of the Application class.
   * @constructor
   * @param {AppConfig} options The application aconfiguration options.
   */
  constructor(options?: AppConfig) {
    initializeAppConfig(options);
  }

  /**
   * Start the application.
   * @async
   * @method
   */
  async start() {
    // setup DI Container
    useContainer(Container);

    const serverConfig = Container.get(ServerConf);
    // setup app insite Azure
    if (!serverConfig.isTesting) {
      const azure = Container.get(Azure);
      appInsights.setup(azure.appInsights)
        .setAutoCollectRequests(true)
        .setAutoCollectPerformance(true)
        .setAutoCollectExceptions(true)
        .setAutoCollectConsole(true)
        .start();
    }

    // create mongo connection
    logger.info('Attending to connect to mongodb');
    await this.createDbConnection();
    logger.info('Connected to mongodb');

    // create express config
    this.express = new ExpressConfig();

    const ports = Container.get(Ports);

    // Start Webserver
    if (!serverConfig.ssl) {
      this.server = this.express.app.listen(ports.http, () => {
        logger.info(`
        ------------
        Server Started!

        Http: http://localhost:${ports.http}
        Debugger: http://127.0.0.1:${ports.http}/?ws=127.0.0.1:${ports.http}&port=${ports.debug}
        Health: http://localhost:${ports.http}/ping

        API Docs: http://localhost:${ports.http}/docs
        API Spec: http://localhost:${ports.http}/api-docs
        ------------
      `);
      });
    } else {
      this.server = spdy.createServer(serverConfig.ssl, this.express.app as any).listen(ports.http, () => {
        logger.info(`
        ------------
        Server Started in with spdy!

        Https: https://localhost:${ports.http}
        Debugger: http://127.0.0.1:${ports.http}/?ws=127.0.0.1:${ports.http}&port=${ports.debug}
        Health: http://localhost:${ports.http}/ping

        API Docs: http://localhost:${ports.http}/docs
        API Spec: http://localhost:${ports.http}/api-docs
        ------------
      `);
      });
    }

    // Start Websockets
    const socket = Container.get(Socket);
    socket.setupSockets(this.server);

    // On server stop, close mongo db instance
    this.server.on('close', () => {
      if (!this.mongo) {
        return;
      }

      this.mongo.disconnect();
    });
  }

  /**
   * Close the application.
   * @method
   * @returns {Promise<void>}
   */
  async close() {
    const promise = !this.mongo ? Promise.resolve() : this.mongo.disconnect();
    return promise.then(() => { this.server.close(); });
  }

  /**
   * Create the database connection.
   * @method
   * @returns {Promise<Db>}
   */
  async createDbConnection() {
    this.mongo = Container.get(Mongo);
    return this.mongo.db();
  }

}
