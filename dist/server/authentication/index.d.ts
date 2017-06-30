/// <reference types="express" />
import * as express from 'express';
import { IsLogged, Authorize } from './JwtStrategy';
export declare function setupAuth(app: express.Express): void;
export { IsLogged, Authorize };
