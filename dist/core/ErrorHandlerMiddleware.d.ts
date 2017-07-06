/// <reference types="express" />
import { ExpressErrorMiddlewareInterface } from 'routing-controllers';
import * as Express from 'express';
/**
 * Represents the Error handler middleware.
 * @class
 */
export declare class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {
    /**
     * Interceptor of errors Manage errors to return traduction keys
     * @method
     * @param {any} error The current error.
     * @param {Express.Request} request The http request.
     * @param {Express.Response} response The http response.
     * @param {Express.NextFunction} next The middleware next function.
     */
    error(error: any, request: Express.Request, response: Express.Response, next: Express.NextFunction): void;
    /**
     * Manage each errors and push in error array
     * @method
     * @param {any} err The current error.
     * @param {string[]} errors The list of errors.
     */
    manageError(err: any, errors: any): void;
    /**
     * Manage type error by validation code
     * @method
     * @param {string} code The validation code
     * @returns {string}
     */
    manageErrorType(code: any): "required" | "unknown" | "too_short" | "too_long";
    /**
     * Manage error message to get a simple code
     * @method
     * @param {string} message The error message
     * @returns {string}
     */
    manageErrorMessage(message: string): "error.id.invalid" | "error.unknown";
}
