/// <reference types="express" />
import * as express from 'express';
export declare const IsLogged: express.Handler;
export declare const Authorize: (...roles: string[]) => (req: express.Request, res: express.Response, next: express.NextFunction) => void;
export declare function setupJwtAuth(app: express.Express): void;
