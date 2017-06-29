import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as health from 'express-ping';
import * as helmet from 'helmet';
import * as compression from 'compression';
import * as glob from 'glob';
import { Container } from 'typedi';
import { useExpressServer } from 'routing-controllers';

import { setupLogging } from './Logging';
import { setupSwagger } from './Swagger';
import { setupAuth } from './Authentication';
import { ServerConf } from '../configuration';

export class ExpressConfig {

  app: express.Express;

  constructor() {
    this.app = express();

    setupSwagger(this.app);
    setupLogging(this.app);
    setupAuth(this.app);

    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(health.ping());

    // use compression
    this.app.use(compression());

    this.setupControllers();
  }

  setupControllers() {
    const server = Container.get(ServerConf);

    // gets specifical directories
    const controllerDirs = glob.sync(path.resolve(server.distPath + '/**/*Controller.js'));
    const middlewaresDirs = glob.sync(path.resolve(server.distPath + '/**/*Middleware.js'));

    useExpressServer(this.app, {
      // defaultErrorHandler: false,
      routePrefix: server.routePrefix,
      controllers: controllerDirs,
      middlewares: middlewaresDirs
    });
  }

}
