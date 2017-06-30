/// <reference types="express" />
import * as express from 'express';
/**
 * Represents the helpers class.
 * @class
 */
export declare class Helpers {
    /** Represents the secret key for authentication */
    private static _secret;
    /** Represents the user service. @private @property {UsersService} */
    private static _userService;
    /** Gets the users service. @readonly @property {UsersService} */
    static readonly userService: any;
    /** Gets the secret key for authentication @readonly @property {string} */
    static readonly secret: string;
    /**
     * Generate the user token.
     * @method
     * @param {express.Request} req The express request.
     * @param {express.Response} res The express response.
     * @param {express.NextFunction} next The express middleware next function.
     */
    static readonly generateToken: (req: express.Request, res: express.Response, next: express.NextFunction) => void;
    /**
     * Generate the auth response.
     * @method
     * @param {express.Request} req The express request.
     * @param {express.Response} res The express response.
     */
    static readonly respond: (req: express.Request, res: express.Response) => void;
    /**
     * Generate the token refresh response.
     * @method
     * @param {express.Request} req The express request.
     * @param {express.Response} res The express response.
     */
    static readonly respondToken: (req: express.Request, res: express.Response) => void;
    /**
     * Generate the user refresh token.
     * @method
     * @param {express.Request} req The express request.
     * @param {express.Response} res The express response.
     * @param {express.NextFunction} next The express middleware next function.
     */
    static readonly generateRefreshToken: (req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>;
    /**
     * Log a user with its refresh token.
     * @method
     * @param {express.Request} req The express request.
     * @param {express.Response} res The express response.
     * @param {express.NextFunction} next The express middleware next function.
     */
    static readonly logUserByRefreshToken: (req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>;
    /**
     * Validate a user refresh token.
     * @method
     * @param {express.Request} req The express request.
     * @param {express.Response} res The express response.
     * @param {express.NextFunction} next The express middleware next function.
     */
    static readonly validateRefreshToken: (req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>;
    /**
     * Reject a user refresh token.
     * @method
     * @param {express.Request} req The express request.
     * @param {express.Response} res The express response.
     * @param {express.NextFunction} next The express middleware next function.
     */
    static readonly rejectRefreshToken: (req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>;
}
