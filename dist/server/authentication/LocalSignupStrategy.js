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
        let user = yield usersService.findOne({ 'providers.local.username': email })
            .catch((reason) => { done(reason); });
        // if user found => return message user already exists.
        if (user) {
            return done(null, false, { message: 'ERR_USER_EXISTS' });
        }
        // get the model user
        const model = req.body;
        if (model.password !== model.passwordConfirm) {
            return done(null, false, { message: 'ERR_PWD_CONFIRM' });
        }
        user = new UsersService_1.UserModel();
        user.email = email;
        user.lastname = model.lastname;
        user.firstname = model.firstname;
        user.avatar = model.avatar;
        user.providers = {
            local: {
                username: email,
                salt: '',
                hash: ''
            }
        };
        usersService.createPassword(user, password);
        const newUser = yield usersService.insertOne(user);
        return done(null, newUser);
    });
}
;
function setupLocalSignupAuth(app) {
    passport.use('local-signup', new passport_local_1.Strategy(opts, verify));
    /**
     * @swagger
     * /register:
     *   post:
     *     description: Register the user and eturns the user authentication token.
     *     operationId: register
     *     tags:
     *       - Authentication
     *     produces:
     *       - application/json
     *       - text/plain
     *     parameters:
     *       - name: userModel
     *         in: body
     *         description: The user registration model.
     *         required: true
     *         schema:
     *           $ref: '#/definitions/RegisterModel'
     *     responses:
     *       200:
     *         description: The authorization token.
     *         schema:
     *           $ref: '#/definitions/AuthModel'
     */
    app.post('/register', passport.authenticate('local-signup', { session: false }), Helpers_1.Helpers.generateToken, Helpers_1.Helpers.generateRefreshToken, Helpers_1.Helpers.respond);
}
exports.setupLocalSignupAuth = setupLocalSignupAuth;
;
//# sourceMappingURL=LocalSignupStrategy.js.map