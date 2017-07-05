import { Container, Inject } from 'typedi';
import * as passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

import { Auth } from '../configuration';

@Inject()
export class Authentication {
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
      jwtFromRequest: ExtractJwt.fromAuthHeader(),
      secretOrKey: process.env.JWT_SECRET || Container.get(Auth).jwtSecret
    };

    passport.use(new JwtStrategy(opts, this.verify));
  }
}
