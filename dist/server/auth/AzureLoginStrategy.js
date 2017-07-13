"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
const passport_azure_ad_1 = require("passport-azure-ad");
const typedi_1 = require("typedi");
const logging_1 = require("../../core/logging");
const UsersService_1 = require("./users/UsersService");
const config = require("./B2CLoginStrategyConfig");
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
    const bearerStrategy = new passport_azure_ad_1.BearerStrategy({
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