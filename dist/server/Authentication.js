"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const AzureLoginStrategy_1 = require("./auth/AzureLoginStrategy");
exports.IsLogged = AzureLoginStrategy_1.IsLogged;
let Authentication = class Authentication {
    setupAuth(app) {
        AzureLoginStrategy_1.setupB2CLoginAuth(app);
    }
};
Authentication = __decorate([
    typedi_1.Inject()
], Authentication);
exports.Authentication = Authentication;
//# sourceMappingURL=Authentication.js.map