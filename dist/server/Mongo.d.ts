import { Db } from 'mongodb';
export declare class Mongo {
    private _db;
    db(): Promise<Db>;
    health(): Promise<boolean>;
    disconnect(): void;
    /**
     * Connect to mongo db
     * @method
     * @returns {Promise<Db>}
     */
    connect(): Promise<Db>;
}
