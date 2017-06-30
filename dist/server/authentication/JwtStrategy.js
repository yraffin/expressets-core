"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
const _ = require("lodash");
const routing_controllers_1 = require("routing-controllers");
const passport_jwt_1 = require("passport-jwt");
const typedi_1 = require("typedi");
const Helpers_1 = require("./Helpers");
const configuration_1 = require("../../configuration");
const UsersService_1 = require("./users/UsersService");
function verify(payload, done) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = payload.id;
        const usersService = typedi_1.Container.get(UsersService_1.UsersService);
        const user = yield usersService.get(id, { fields: { email: 1, rights: 1, isSystem: 1, refresh: 1, avatar: 1 } })
            .catch((reason) => { done(reason); });
        // update rights if user system
        // user.rights = Helpers.getUserRights(user);
        if (user) {
            done(null, user);
        }
        else {
            done(null, false);
        }
    });
}
;
exports.IsLogged = passport.authenticate('jwt', { session: false });
exports.Authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !req.user.rights) {
            next(new routing_controllers_1.UnauthorizedError(!req.user ? 'Unauthorized' : 'Forbidden'));
            return;
        }
        if (req.user) {
            // TODO: user has all rights for now.
            next(null);
            return;
        }
        if (!_.some(req.user.rights || [], right => roles.indexOf(right) > -1)) {
            next(new routing_controllers_1.UnauthorizedError('Forbidden'));
            return;
        }
        next(null);
    };
};
function setupJwtAuth(app) {
    const opts = {
        jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeader(),
        secretOrKey: process.env.JWT_SECRET || typedi_1.Container.get(configuration_1.Auth).jwtSecret
    };
    passport.use('jwt', new passport_jwt_1.Strategy(opts, verify));
    /**
     * @swagger
     * /token:
     *   post:
     *     description: Refresh the user token.
     *     operationId: generateToken
     *     tags:
     *       - Authentication
     *     produces:
     *       - application/json
     *       - text/plain
     *     parameters:
     *       - name: refresh
     *         in: body
     *         description: The user refresh token.
     *         required: true
     *         schema:
     *           type: object
     *           properties:
     *             refresh:
     *               type: string
     *     responses:
     *       200:
     *         description: The authorization token.
     *         schema:
     *           $ref: '#/definitions/AuthTokenModel'
     *     security:
     *        - jwt_token: [ ]
     */
    app.post('/token', Helpers_1.Helpers.logUserByRefreshToken, Helpers_1.Helpers.generateToken, Helpers_1.Helpers.respondToken);
    /**
     * @swagger
     * /token/reject:
     *   post:
     *     description: Reject the user refresh token.
     *     operationId: rejectRefreshToken
     *     tags:
     *       - Authentication
     *     produces:
     *       - application/json
     *       - text/plain
     *     parameters:
     *       - name: Authorization
     *         in: header
     *         description: JWT token.
     *         required: true
     *         type: string
     *       - name: refresh
     *         in: body
     *         description: The user refresh token.
     *         required: true
     *         schema:
     *           type: object
     *           properties:
     *             refresh:
     *               type: string
     *     responses:
     *       200:
     *         description: The refresh token has been reject.
     *     security:
     *        - jwt_token: [ ]
     */
    app.post('/token/reject', exports.IsLogged, Helpers_1.Helpers.rejectRefreshToken);
}
exports.setupJwtAuth = setupJwtAuth;
;
//# sourceMappingURL=JwtStrategy.js.map