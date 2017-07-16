import * as express from 'express';
import * as passport from 'passport';
import * as config from 'config';
import { BearerStrategy } from 'passport-azure-ad';
import { Container } from 'typedi';
import { logger } from '../../core/logging';
import { UserModel, UsersService } from './users/UsersService';
import * as b2cConfig from './B2CLoginStrategyConfig';
import { Azure } from '../../configuration';

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
  const azureConfig = Container.get(Azure);
  const bearerStrategy = new BearerStrategy({
    identityMetadata: `https://login.microsoftonline.com/${azureConfig.b2cTenantName}/v2.0/.well-known/openid-configuration`,
    clientID: azureConfig.b2cClientId,
    validateIssuer: b2cConfig.creds.validateIssuer,
    issuer: b2cConfig.creds.issuer,
    passReqToCallback: b2cConfig.creds.passReqToCallback,
    isB2C: b2cConfig.creds.isB2C,
    policyName: azureConfig.b2cSigninStrategy,
    allowMultiAudiencesInToken: b2cConfig.creds.allowMultiAudiencesInToken,
    audience: b2cConfig.creds.audience,
    loggingLevel: process.env.LOG_LEVEL || config.get('loglevel'),
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
