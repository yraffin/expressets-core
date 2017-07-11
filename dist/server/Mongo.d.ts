import { Db } from 'mongodb';
export declare class Mongo {
    private _db;
    getDb(): Db;
    db(): Promise<Db>;
    health(): Promise<boolean>;
    /**
     * Disconnect from the database.
     * @method
     * @returns {Promise<void>}
     */
    disconnect(): Promise<void>;
    /**
     * Connect to mongo db
     * @method
     * @returns {Promise<Db>}
     */
    connect(): Promise<Db>;
}
