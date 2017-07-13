'use strict';
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
require("ts-helpers");
require("source-map-support/register");
require("reflect-metadata");
require("./types");
require("es6-shim");
__export(require("routing-controllers"));
__export(require("event-dispatch"));
__export(require("typedi"));
var Application_1 = require("./server/Application");
exports.Application = Application_1.Application;
var Authentication_1 = require("./server/Authentication");
exports.Authentication = Authentication_1.Authentication;
exports.IsLogged = Authentication_1.IsLogged;
var Swagger_1 = require("./server/Swagger");
exports.Swagger = Swagger_1.Swagger;
var Socket_1 = require("./server/Socket");
exports.Socket = Socket_1.Socket;
__export(require("./configuration"));
__export(require("./core"));
//# sourceMappingURL=index.js.map