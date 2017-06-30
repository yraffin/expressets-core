/// <reference types="express" />
import * as express from 'express';
export declare class ExpressConfig {
    app: express.Express;
    constructor();
    setupControllers(): void;
}
