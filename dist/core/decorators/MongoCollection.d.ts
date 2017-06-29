import { MongoModelBase } from '../MongoModelBase';
/**
 * Represents the @MongoCollectionClass<TModel>() decorator.
 * @function
 */
export declare function MongoCollection<TModel extends MongoModelBase>(ctor: {
    new (): TModel;
}): any;
