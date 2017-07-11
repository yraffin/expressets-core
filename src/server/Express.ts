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
import * as session from 'express-session';
import * as connectMongo from 'connect-mongo';

import { setupLogging } from './Logging';
import { Swagger } from './Swagger';
import { Authentication } from './Authentication';
import { Mongo } from './Mongo';
import { ServerConf, Mongo as MongoConf } from '../configuration';
import { ErrorHandlerMiddleware } from '../core/ErrorHandlerMiddleware';

export class ExpressConfig {

  app: express.Express;

  constructor() {
    this.app = express();

    // setup auth
    const swagger = Container.get(Swagger);
    swagger.setupSwagger(this.app);

    setupLogging(this.app);

    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(health.ping());

    // use compression
    this.app.use(compression());

    // use session
    const mongoConf = Container.get(MongoConf);
    const mongo = Container.get(Mongo);
    if (mongoConf.useSessionStore) {
      const mongoStore = connectMongo(session);
      const store = new mongoStore({
        db: mongo.getDb(),
        clear_interval: mongoConf.sessionMaxAge
      });
      this.app.use(session({
        secret: mongoConf.sessionSecret,
        saveUninitialized: true,
        resave: true,
        cookie: { maxAge: mongoConf.sessionMaxAge * 1000 },
        store,
      }));
    }

    // setup auth
    const authentication = Container.get(Authentication);
    authentication.setupAuth(this.app);

    this.setupControllers();
  }

  setupControllers() {
    const server = Container.get(ServerConf);

    // gets specifical directories
    const controllerDirs = glob.sync(path.resolve(server.distPath + '/**/*Controller.js'));

    const middlewaresDirs = glob.sync(path.resolve(server.distPath + '/**/*Middleware.js'));
    const middlewaresFuncDirs = middlewaresDirs.map((f) => require(f));
    middlewaresFuncDirs.push(ErrorHandlerMiddleware);

    useExpressServer(this.app, {
      defaultErrorHandler: false,
      routePrefix: server.routePrefix,
      controllers: controllerDirs,
      middlewares: middlewaresFuncDirs
    });
  }

}
