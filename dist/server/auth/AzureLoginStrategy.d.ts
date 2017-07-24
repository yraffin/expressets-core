/// <reference types="express" />
import * as express from 'express';
export declare function setupB2CLoginAuth(app: express.Express): void;
export declare const IsLogged: (req: any, res: any, next: any) => any;
