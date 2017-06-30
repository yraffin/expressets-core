"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcrypt-nodejs");
const mongodb_1 = require("mongodb");
const typedi_1 = require("typedi");
const configuration_1 = require("../../configuration");
const UsersService_1 = require("./users/UsersService");
/**
 * Represents the helpers class.
 * @class
 */
class Helpers {
    /** Gets the users service. @readonly @property {UsersService} */
    static get userService() {
        if (!this._userService) {
            this._userService = typedi_1.Container.get(UsersService_1.UsersService);
        }
        return this._userService;
    }
    /** Gets the secret key for authentication @readonly @property {string} */
    static get secret() {
        if (!this._secret) {
            this._secret = process.env.JWT_SECRET || typedi_1.Container.get(configuration_1.Auth).jwtSecret;
        }
        return this._secret;
    }
    /**
     * Generate the user token.
     * @method
     * @param {express.Request} req The express request.
     * @param {express.Response} res The express response.
     * @param {express.NextFunction} next The express middleware next function.
     */
    static get generateToken() {
        return (req, res, next) => {
            req['token'] = jwt.sign({
                id: req.user.id
            }, this.secret, {
                expiresIn: config.get('auth.expiresIn')
            });
            next();
        };
    }
    /**
     * Generate the auth response.
     * @method
     * @param {express.Request} req The express request.
     * @param {express.Response} res The express response.
     */
    static get respond() {
        return (req, res) => {
            res.status(200).json({
                token: req['token'],
                refresh: req['refresh'],
                username: req.user.email
            });
        };
    }
    /**
     * Generate the token refresh response.
     * @method
     * @param {express.Request} req The express request.
     * @param {express.Response} res The express response.
     */
    static get respondToken() {
        return (req, res) => {
            res.status(200).json({
                token: req['token'],
                username: req.user.email
            });
        };
    }
    /**
     * Generate the user refresh token.
     * @method
     * @param {express.Request} req The express request.
     * @param {express.Response} res The express response.
     * @param {express.NextFunction} next The express middleware next function.
     */
    static get generateRefreshToken() {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if (!req['token']) {
                res.status(499).json({
                    errors: [{
                            message: 'ERR_TOKEN_REQUIRED'
                        }]
                });
                return;
            }
            req['refresh'] = req.user.id + '.' + bcrypt.hashSync(req.user.email + '-' + Date.now());
            req.user['refresh'] = req['refresh'];
            this.userService.updateOne(req.user).catch(reason => next(reason));
            return next();
        });
    }
    /**
     * Log a user with its refresh token.
     * @method
     * @param {express.Request} req The express request.
     * @param {express.Response} res The express response.
     * @param {express.NextFunction} next The express middleware next function.
     */
    static get logUserByRefreshToken() {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const refresh = req.body.refresh;
            const user = yield this.userService.findOne({ 'refresh': refresh }).catch(reason => next(reason));
            if (!user) {
                res.status(498).json({
                    error: {
                        status: 498,
                        message: 'ERR_INVALID_REFRESH'
                    }
                });
                return;
            }
            req.user = user;
            return next();
        });
    }
    /**
     * Validate a user refresh token.
     * @method
     * @param {express.Request} req The express request.
     * @param {express.Response} res The express response.
     * @param {express.NextFunction} next The express middleware next function.
     */
    static get validateRefreshToken() {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if (!req.user) {
                res.status(401).json({
                    error: {
                        status: 401,
                        message: 'ERR_UNAUTHORIZED'
                    }
                });
                return;
            }
            const refresh = req.body.refresh;
            const item = yield this.userService.findOne({ '_id': mongodb_1.ObjectID.createFromHexString(req.user.id) }, { _id: 1, refresh: 1 }).catch(reason => next(reason));
            if (item.refresh === refresh) {
                return next();
            }
            res.status(498).json({
                error: {
                    status: 498,
                    message: 'ERR_INVALID_REFRESH'
                }
            });
        });
    }
    /**
     * Reject a user refresh token.
     * @method
     * @param {express.Request} req The express request.
     * @param {express.Response} res The express response.
     * @param {express.NextFunction} next The express middleware next function.
     */
    static get rejectRefreshToken() {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if (!req.user) {
                res.status(401).json({
                    error: {
                        status: 401,
                        message: 'ERR_UNAUTHORIZED'
                    }
                });
                return;
            }
            req.user.refresh = null;
            yield this.userService.updateOne(req.user).catch(reason => next(reason));
            res.status(204).json({ result: true });
        });
    }
}
/** Represents the user service. @private @property {UsersService} */
Helpers._userService = null;
exports.Helpers = Helpers;
//# sourceMappingURL=Helpers.js.map