"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const swaggerTools = require("swagger-tools");
const passport = require("passport");
const typedi_1 = require("typedi");
const configuration_1 = require("../configuration");
function setupSwagger(app) {
    const server = typedi_1.Container.get(configuration_1.ServerConf);
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
}
exports.setupSwagger = setupSwagger;
;
function setupSwaggerSecurity(middleware) {
    return middleware.swaggerSecurity({
        jwt_token: (req, authOrSecDef, scopes, callback) => {
            passport.authenticate('jwt', { session: false }, (err, user, info) => {
                if (err)
                    callback(new Error('Error in passport authenticate'));
                if (!user)
                    callback(new Error('Failed to authenticate oAuth token'));
                req.user = user;
                return callback();
            })(req, null, callback);
        }
    });
}
;
//# sourceMappingURL=Swagger.js.map