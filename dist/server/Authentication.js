"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const logging_1 = require("../core/logging");
let Authentication = class Authentication {
    setupAuth(app) {
        logging_1.logger.info('no authentication define.');
    }
};
Authentication = __decorate([
    typedi_1.Inject()
], Authentication);
exports.Authentication = Authentication;
//# sourceMappingURL=Authentication.js.map