"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const passport = require("passport");
const passport_jwt_1 = require("passport-jwt");
const configuration_1 = require("../configuration");
let Authentication = class Authentication {
    verify(payload, done) {
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
    setupAuth(app) {
        app.use(passport.initialize());
        const opts = {
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeader(),
            secretOrKey: process.env.JWT_SECRET || typedi_1.Container.get(configuration_1.Auth).jwtSecret
        };
        passport.use(new passport_jwt_1.Strategy(opts, this.verify));
    }
};
Authentication = __decorate([
    typedi_1.Inject()
], Authentication);
exports.Authentication = Authentication;
//# sourceMappingURL=Authentication.js.map