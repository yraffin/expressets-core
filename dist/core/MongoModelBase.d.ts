import { ObjectID } from 'mongodb';
/**
 * Represents the base mongo model
 * @class
 */
export declare abstract class MongoModelBase {
    _id?: ObjectID;
    id?: string;
}
