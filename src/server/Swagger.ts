import * as fs from 'fs';
import * as path from 'path';
import * as swaggerTools from 'swagger-tools';
import * as passport from 'passport';
import { Container } from 'typedi';

import { ServerConf } from '../configuration';

export function setupSwagger(app) {
  const server = Container.get(ServerConf);

  // resolve the spec
  const spath = path.resolve(server.distPath + '/spec.json');
  const file = fs.readFileSync(spath, 'utf8');
  const spec = JSON.parse(file);

  // setup middleware swagger middleware in express
  swaggerTools.initializeMiddleware(spec, (middleware) => {
    app.use(middleware.swaggerUi());
    app.use(middleware.swaggerMetadata());
    app.use(setupSwaggerSecurity(middleware));
    app.use(middleware.swaggerValidator({
      validateResponse: false
    }));
  });
};

function setupSwaggerSecurity(middleware) {
  return middleware.swaggerSecurity({
    jwt_token: (req, authOrSecDef, scopes, callback) => {
      passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) callback(new Error('Error in passport authenticate'));
        if (!user) callback(new Error('Failed to authenticate oAuth token'));
        req.user = user;
        return callback();
      })(req, null, callback);
    }
  });
};
