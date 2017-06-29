import * as express from "express";
import * as http from "http";
import * as config from 'config';
import { Db } from 'mongodb';
import { useContainer } from 'routing-controllers';
import { Container } from 'typedi';

import { ExpressConfig } from './Express';
import { setupSockets } from './Socket';
import { logger } from '../common/logging';
import { Mongo } from './Mongo';
import { Ports, initializeAppConfig, AppConfig } from '../configuration';

/**
 * Represents the application.
 * @class
 */
export class Application {

  /** The express http server. @property {http.Server} */
  server: http.Server;

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

    // create mongo connection
    await this.createDbConnection();

    // create express config
    this.express = new ExpressConfig();

    const ports = Container.get(Ports);

    // Start Webserver
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

    // Start Websockets
    setupSockets(this.server);

    // On server stop, close mongo db instance
    this.server.on('close', () => {
      if (!this.mongo) {
        return;
      }

      this.mongo.disconnect();
    })
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
