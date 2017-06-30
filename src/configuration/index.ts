import { Container } from 'typedi';

import { Ports, IPorts } from './Ports';
import { Auth, IAuth } from './Auth';
import { Mongo, IMongo } from './Mongo';
import { ServerConf, IServerConf } from './ServerConf';
import { Action } from 'routing-controllers';
export { Ports, Auth, ServerConf, Mongo };

/**
 * Represents the application configuration options.
 * @class
 */
export class AppConfig {
  ports?: IPorts;
  auth?: IAuth;
  server?: IServerConf;
  mongo?: IMongo;
  authCheck?: (action: Action, roles: any[]) => Promise<boolean> | boolean;

  /**
   * Initializes a new instance of the AppConfig class.
   * @constructor
   * @param {AppConfig} config The initial configuration.
   */
  constructor(config?: AppConfig) {
    this.ports = config.ports;
    this.auth = config.auth;
    this.server = config.server;
    this.mongo = config.mongo;
    this.authCheck = config.authCheck;
  }
}

/**
 * Initializes the application configuration.
 * @method
 * @param {AppConfig} options The application configuration options.
 */
export function initializeAppConfig(options?: AppConfig) {
  const ports = Container.get(Ports);
  ports.initialize(options.ports || {});

  const auth = Container.get(Auth);
  auth.initialize(options.auth || {});

  const server = Container.get(ServerConf);
  server.initialize(options.server || {});

  const mongo = Container.get(Mongo);
  mongo.initialize(options.mongo || {});
}
