"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swaggerJSDoc = require("swagger-jsdoc");
const fs = require("fs");
const glob = require("glob");
const ctrls = glob.sync('./dist/**/*Controller.js');
const models = glob.sync('./dist/**/*Model.js');
let { version, name, description } = require('../../package.json');
const options = {
    swaggerDefinition: {
        info: {
            title: name,
            version,
            description
        }
    },
    apis: [...models, ...ctrls]
};
const spec = swaggerJSDoc(options);
fs.writeFile('./dist/spec.json', JSON.stringify(spec, null, '\t'));
//# sourceMappingURL=swagger.js.map