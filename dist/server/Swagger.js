"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const swaggerTools = require("swagger-tools");
const typedi_1 = require("typedi");
const configuration_1 = require("../configuration");
let Swagger = class Swagger {
    setupSwagger(app) {
        const server = typedi_1.Container.get(configuration_1.ServerConf);
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
};
Swagger = __decorate([
    typedi_1.Inject()
], Swagger);
exports.Swagger = Swagger;
//# sourceMappingURL=Swagger.js.map