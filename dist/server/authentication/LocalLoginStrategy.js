"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
const passport_local_1 = require("passport-local");
const typedi_1 = require("typedi");
const Helpers_1 = require("./Helpers");
const UsersService_1 = require("./users/UsersService");
const opts = {
    // by default, local strategy uses username and password, we will override with email
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback
};
function verify(req, email, password, done) {
    return __awaiter(this, void 0, void 0, function* () {
        const usersService = typedi_1.Container.get(UsersService_1.UsersService);
        const user = yield usersService.findOne({ 'providers.local.username': email }, { fields: { email: 1, 'providers.local': 1 } })
            .catch((reason) => { done(reason); });
        // if no user found => return message no user.
        if (!user) {
            return done(null, false, { message: 'ERR_USER_CREDENTIALS' });
        }
        if (!usersService.isValidPassword(user, password)) {
            return done(null, false, { message: 'ERR_USER_CREDENTIALS' });
        }
        return done(null, user);
    });
}
;
function setupLocalLoginAuth(app) {
    passport.use('local-login', new passport_local_1.Strategy(opts, verify));
    /**
     * @swagger
     * /auth:
     *   post:
     *     description: Returns the user authentication token.
     *     operationId: authenticate
     *     tags:
     *       - Authentication
     *     produces:
     *       - application/json
     *       - text/plain
     *     parameters:
     *       - name: credentials
     *         in: body
     *         description: The user credentials.
     *         required: true
     *         schema:
     *           $ref: '#/definitions/CredentialModel'
     *     responses:
     *       200:
     *         description: The authorization token.
     *         schema:
     *           $ref: '#/definitions/AuthModel'
     */
    app.post('/auth', passport.authenticate('local-login', { session: false }), Helpers_1.Helpers.generateToken, Helpers_1.Helpers.generateRefreshToken, Helpers_1.Helpers.respond);
}
exports.setupLocalLoginAuth = setupLocalLoginAuth;
;
//# sourceMappingURL=LocalLoginStrategy.js.map