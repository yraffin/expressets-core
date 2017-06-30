"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
const LocalLoginStrategy_1 = require("./LocalLoginStrategy");
const LocalSignupStrategy_1 = require("./LocalSignupStrategy");
const JwtStrategy_1 = require("./JwtStrategy");
exports.IsLogged = JwtStrategy_1.IsLogged;
exports.Authorize = JwtStrategy_1.Authorize;
function setupAuth(app) {
    app.use(passport.initialize());
    LocalLoginStrategy_1.setupLocalLoginAuth(app);
    LocalSignupStrategy_1.setupLocalSignupAuth(app);
    JwtStrategy_1.setupJwtAuth(app);
}
exports.setupAuth = setupAuth;
;
//# sourceMappingURL=index.js.map