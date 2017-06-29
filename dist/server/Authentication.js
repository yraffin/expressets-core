"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const passport = require("passport");
const passport_jwt_1 = require("passport-jwt");
const configuration_1 = require("../configuration");
function verify(payload, done) {
    const id = payload.sub;
    return id !== undefined;
    /*
    User.findOne({ id: jwt_payload.sub }, (err, user) => {
        if (err) return done(err, false);
  
        if (user) {
          done(null, user);
        } else {
          done(null, false);
          // or you could create a new account
        }
    });
    */
}
;
function setupAuth(app) {
    app.use(passport.initialize());
    const opts = {
        jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeader(),
        secretOrKey: process.env.JWT_SECRET || typedi_1.Container.get(configuration_1.Auth).jwtSecret
    };
    passport.use(new passport_jwt_1.Strategy(opts, verify));
}
exports.setupAuth = setupAuth;
;
//# sourceMappingURL=Authentication.js.map