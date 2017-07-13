import * as express from 'express';
import * as passport from 'passport';
import { BearerStrategy } from 'passport-azure-ad';
import { Container } from 'typedi';
import { logger } from '../../core/logging';
import { UserModel, UsersService } from './users/UsersService';
import * as config from './B2CLoginStrategyConfig';

async function findByOid(token, done) {
  const usersService = Container.get(UsersService);
  let user = await usersService.findOne({ 'providers.azure.oid': token.oid })
    .catch((reason) => { done(reason); }) as UserModel;

  // if no user create one
  if (!user) {
    const userModel = new UserModel();
    userModel.email = token.emails[0];
    userModel.firstname = token.family_name;
    userModel.lastname = token.given_name;
    userModel.providers = userModel.providers || {};
    userModel.providers.azure = { oid: token.oid };
    user = await usersService.insertOne(userModel);
  }

  // if (!usersService.isValidPassword(user, password)) {
  //   return done(null, false, { message: 'ERR_USER_CREDENTIALS' });
  // }

  return done(null, user);
}

const users = [];
export function setupB2CLoginAuth(app: express.Express) {
  const bearerStrategy = new BearerStrategy({
    identityMetadata: config.creds.identityMetadata,
    clientID: config.creds.clientID,
    validateIssuer: config.creds.validateIssuer,
    issuer: config.creds.issuer,
    passReqToCallback: config.creds.passReqToCallback,
    isB2C: config.creds.isB2C,
    policyName: config.creds.policyName,
    allowMultiAudiencesInToken: config.creds.allowMultiAudiencesInToken,
    audience: config.creds.audience,
    loggingLevel: config.creds.loggingLevel,
  }, (token, done) => {
    logger.info(token, 'was the token retreived');
    if (!token.oid)
      done(new Error('oid is not found in token'));
    else {
      findByOid(token, done);
    }
  }
  );

  app.use(passport.initialize());
  passport.use(bearerStrategy);
}

export const IsLogged = passport.authenticate('oauth-bearer', { session: false });
