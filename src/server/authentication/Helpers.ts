import * as jwt from 'jsonwebtoken';
import * as config from 'config';
import * as express from 'express';
import * as bcrypt from 'bcrypt-nodejs';
import { ObjectID } from 'mongodb';
import { Container } from 'typedi';

import { Auth } from '../../configuration';
import { UserModel, UsersService } from './users/UsersService';

/**
 * Represents the helpers class.
 * @class
 */
export class Helpers {
  /** Represents the secret key for authentication */
  private static _secret: string;

  /** Represents the user service. @private @property {UsersService} */
  private static _userService = null;

  /** Gets the users service. @readonly @property {UsersService} */
  public static get userService() {
    if (!this._userService) {
      this._userService = Container.get(UsersService);
    }

    return this._userService;
  }

  /** Gets the secret key for authentication @readonly @property {string} */
  public static get secret() {
    if (!this._secret) {
      this._secret = process.env.JWT_SECRET || Container.get(Auth).jwtSecret;
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
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
      req['token'] = jwt.sign(
        {
          id: req.user.id
        },
        this.secret,
        {
          expiresIn: config.get<number>('auth.expiresIn')
        }
      );
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
    return (req: express.Request, res: express.Response) => {
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
    return (req: express.Request, res: express.Response) => {
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
    return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
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
    };
  }

  /**
   * Log a user with its refresh token.
   * @method
   * @param {express.Request} req The express request.
   * @param {express.Response} res The express response.
   * @param {express.NextFunction} next The express middleware next function.
   */
  static get logUserByRefreshToken() {
    return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      const refresh = req.body.refresh;
      const user: UserModel = await this.userService.findOne({ 'refresh': refresh }).catch(reason => next(reason));

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
    };
  }

  /**
   * Validate a user refresh token.
   * @method
   * @param {express.Request} req The express request.
   * @param {express.Response} res The express response.
   * @param {express.NextFunction} next The express middleware next function.
   */
  static get validateRefreshToken() {
    return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
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
      const item: UserModel = await this.userService.findOne({ '_id': ObjectID.createFromHexString(req.user.id) },
        { _id: 1, refresh: 1 }).catch(reason => next(reason));

      if (item.refresh === refresh) {
        return next();
      }

      res.status(498).json({
        error: {
          status: 498,
          message: 'ERR_INVALID_REFRESH'
        }
      });
    };
  }

  /**
   * Reject a user refresh token.
   * @method
   * @param {express.Request} req The express request.
   * @param {express.Response} res The express response.
   * @param {express.NextFunction} next The express middleware next function.
   */
  static get rejectRefreshToken() {
    return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
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
      await this.userService.updateOne(req.user).catch(reason => next(reason));

      res.status(204).json({ result: true });
    };
  }
}
