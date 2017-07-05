import * as fs from 'fs';
import * as path from 'path';
import * as swaggerTools from 'swagger-tools';
import { Inject, Container } from 'typedi';

import { ServerConf } from '../configuration';

@Inject()
export class Swagger {
  setupSwagger(app) {
    const server = Container.get(ServerConf);

    // resolve the spec
    const spath = path.resolve(server.distPath + '/spec.json');
    const file = fs.readFileSync(spath, 'utf8');
    const spec = JSON.parse(file);

    // setup middleware swagger middleware in express
    swaggerTools.initializeMiddleware(spec, (middleware) => {
      app.use(middleware.swaggerUi());
      app.use(middleware.swaggerMetadata());
      app.use(this.setupSwaggerSecurity(middleware));
      app.use(middleware.swaggerValidator({
        validateResponse: false
      }));
    });
  }
  setupSwaggerSecurity(middleware) {
    return middleware.swaggerSecurity({
      jwt_token: (req, authOrSecDef, scopes, callback) => {
        callback(true);
      }
    });
  }
}
