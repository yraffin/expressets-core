"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
const config = require("config");
const passport_azure_ad_1 = require("passport-azure-ad");
const typedi_1 = require("typedi");
const logging_1 = require("../../core/logging");
const UsersService_1 = require("./users/UsersService");
const b2cConfig = require("./B2CLoginStrategyConfig");
const configuration_1 = require("../../configuration");
function findByOid(token, done) {
    return __awaiter(this, void 0, void 0, function* () {
        const usersService = typedi_1.Container.get(UsersService_1.UsersService);
        let user = yield usersService.findOne({ 'providers.azure.oid': token.oid })
            .catch((reason) => { done(reason); });
        // if no user create one
        if (!user) {
            const userModel = new UsersService_1.UserModel();
            userModel.email = token.emails[0];
            userModel.firstname = token.family_name;
            userModel.lastname = token.given_name;
            userModel.providers = userModel.providers || {};
            userModel.providers.azure = { oid: token.oid };
            user = yield usersService.insertOne(userModel);
        }
        // if (!usersService.isValidPassword(user, password)) {
        //   return done(null, false, { message: 'ERR_USER_CREDENTIALS' });
        // }
        return done(null, user);
    });
}
const users = [];
function setupB2CLoginAuth(app) {
    const azureConfig = typedi_1.Container.get(configuration_1.Azure);
    const bearerStrategy = new passport_azure_ad_1.BearerStrategy({
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
        logging_1.logger.info(token, 'was the token retreived');
        if (!token.oid)
            done(new Error('oid is not found in token'));
        else {
            findByOid(token, done);
        }
    });
    app.use(passport.initialize());
    passport.use(bearerStrategy);
}
exports.setupB2CLoginAuth = setupB2CLoginAuth;
exports.IsLogged = passport.authenticate('oauth-bearer', { session: false });
//# sourceMappingURL=AzureLoginStrategy.js.map