import { Ports, IPorts } from './Ports';
import { Auth, IAuth } from './Auth';
import { Mongo, IMongo } from './Mongo';
import { ServerConf, IServerConf } from './ServerConf';
import { Azure, IAzure } from './Azure';
import { Action } from 'routing-controllers';
export { Ports, Auth, ServerConf, Mongo, Azure };
/**
 * Represents the application configuration options.
 * @class
 */
export declare class AppConfig {
    ports?: IPorts;
    auth?: IAuth;
    server?: IServerConf;
    mongo?: IMongo;
    azure?: IAzure;
    authCheck?: (action: Action, roles: any[]) => Promise<boolean> | boolean;
    /**
     * Initializes a new instance of the AppConfig class.
     * @constructor
     * @param {AppConfig} config The initial configuration.
     */
    constructor(config?: AppConfig);
}
/**
 * Initializes the application configuration.
 * @method
 * @param {AppConfig} options The application configuration options.
 */
export declare function initializeAppConfig(options?: AppConfig): void;
