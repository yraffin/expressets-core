import {
  Middleware, ExpressErrorMiddlewareInterface,
  HttpError
} from 'routing-controllers';
import { ValidationError } from 'class-validator';
import * as Express from 'express';

/**
 * Represents the Error handler middleware.
 * @class
 */
@Middleware({ type: 'after' })
export class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {

  /** 
   * Manage each errors and push in error array
   * @method
   * @param {any} err The current error.
   * @param {string[]} errors The list of errors.
   */
  static manageError(err, errors, entity?) {
    // Validation error
    if (err instanceof ValidationError) {
        // Get entity name 
        if(!entity) {
            entity = err.target.constructor.name.match(/[A-Z][a-z]+/g)[0].toLowerCase();
        }
        // Treat error
        if(err.children.length > 0) {
            err.children.forEach((child) => {
                ErrorHandlerMiddleware.manageError(child, errors, entity);
            });
        } else {
            for (let key in err.constraints) {
                // Get code error
                const type = ErrorHandlerMiddleware.manageErrorType(key);
                // Push in array
                errors.push(['error', entity, err.property, type].join('.'));
            }
        }
    }
  }
  /**
   * Manage type error by validation code
   * @method
   * @param {string} code The validation code
   * @returns {string}
   */
  static manageErrorType(code) {
    switch (code) {
      case 'minLength': {
        return 'too_short';
      }
      case 'maxLength': {
        return 'too_long';
      }
      case 'isNotEmpty': {
        return 'required';
      }
      default: {
        return 'unknown';
      }
    }
  }

  /**
   * Manage error message to get a simple code
   * @method
   * @param {string} message The error message
   * @returns {string}
   */
  static manageErrorMessage(message: string) {
    const patternId = /Argument passed in must be a single String of 12 bytes or a string of 24 hex characters/;
    if (new RegExp(patternId).test(message)) {
      return 'error.id.invalid';
    }

    return 'error.unknown';
  }

  /**
   * Interceptor of errors Manage errors to return traduction keys
   * @method
   * @param {any} error The current error.
   * @param {Express.Request} request The http request.
   * @param {Express.Response} response The http response.
   * @param {Express.NextFunction} next The middleware next function.
   */
  error(error: any, request: Express.Request, response: Express.Response, next: Express.NextFunction) {
    const errors = [];

    if (response.statusMessage) {
      return next();
    }

    // Treat http errors
    if (error instanceof HttpError) {
      if (error['errors']) {
        // Manage list of errors
        error['errors'].forEach((err) => {
           ErrorHandlerMiddleware.manageError(err, errors);
        });
      } else {
        // Manage unique error
        errors.push(error.message);
      }
    } else {
      error.httpCode = 400;
      errors.push(ErrorHandlerMiddleware.manageErrorMessage(error.message));
    }
    // Return response
    response.status(error.httpCode).send({ errors });
  }
}
