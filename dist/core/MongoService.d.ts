import { ObjectID, FindOneOptions, Cursor, Collection } from 'mongodb';
import { Mongo } from '../server/Mongo';
import { MongoModelBase } from './MongoModelBase';
/**
 * Represents the pagination filter.
 * @class
 */
export declare class PaginationFilter {
    /** Represents the sort filter @property {any} */
    filter?: any;
    /** Represents the sort filter @property {string} */
    sort?: string;
    /** Represents the page number @property {number} */
    page: number;
    /** Represents the page limit @property {number} */
    limit: number;
}
/**
 * Represents the base mongo service.
 * @class
 */
export declare class MongoService<TDocument extends MongoModelBase> {
    /** Represents The mongodb configuration @property {Mongo} */
    mongodb: Mongo;
    /** The mongodb collection name. @private @property {string} */
    protected collectionName: string;
    /**
     * Gets a MongoDB collection.
     * @method
     * @param {string} name The name of the requested collection.
     * @returns {Promise<Collection>}
     */
    collection(name?: string): Promise<Collection<any>>;
    /**
     * Gets a list of collection documents depends on the pagination filter.
     * @method
     * @param {PaginationFilter} pagination The requested pagination filter.
     * @returns {Promise<TDocument[]>}
     */
    all(pagination?: PaginationFilter): Promise<TDocument[]>;
    /**
     * Gets a list of collection documents depends on query and pagination filter.
     * @method
     * @param {Object} query The query filter.
     * @param {PaginationFilter} pagination The requested pagination filter.
     * @returns {Promise<TDocument[]>}
     */
    find(query: any, pagination?: PaginationFilter): Promise<TDocument[]>;
    /**
     * Gets a list of collection partial documents depends on query and pagination filter.
     * Only document properties defined in projection Object would be returned.
     * @method
     * @param {Object} query The query filter.
     * @param {Object} projection The document properties projection to request.
     * @param {PaginationFilter} pagination The requested pagination filter.
     * @returns {Promise<TDocument[]>}
     */
    filter(query: any, projection: Object, pagination?: PaginationFilter): Promise<TDocument[]>;
    /**
     * Gets the number of collection documents depends on query and pagination filter.
     * @method
     * @param {Object} query The query filter.
     * @returns {Promise<number>}
     */
    count(query?: any): Promise<number>;
    /**
     * Gets a document by its identifier.
     * @method
     * @param {string} id The requested document identifier.
     * @param {FindOneOptions} options The request options.
     * @returns {Promise<TDocument>}
     */
    get(id: string, options?: FindOneOptions): Promise<TDocument>;
    /**
     * Gets the first document solving the filter query.
     * @method
     * @param {Object} filter The requested filter.
     * @param {FindOneOptions} options The request options.
     * @returns {Promise<TDocument>}
     */
    findOne(filter: Object, options?: FindOneOptions): Promise<TDocument>;
    /**
     * Insert one document to the collection.
     * @method
     * @param {TDocument} document The Document to insert.
     * @returns {Promise<TDocument>}
     */
    insertOne(document: TDocument): Promise<TDocument>;
    /**
     * Insert many documents to the collection.
     * @method
     * @param {TDocument[]} documents The Documents to insert.
     * @returns {Promise<TDocument[]>}
     */
    insertMany(documents: TDocument[]): Promise<TDocument[]>;
    /**
     * Update a collection document.
     * @method
     * @param {TDocument} document The Document to update.
     * @param {boolean} replace Value indicating whether to replace the entire document or partially update.
     * @returns {Promise<TDocument>}
     */
    updateOne(document: TDocument, replace?: boolean): Promise<TDocument>;
    /**
     * Remove collection document.
     * @method
     * @param {string} id The Document identifier to remove.
     * @returns {Promise<number>}
     */
    removeOne(id: string): Promise<number>;
    /**
     * Remove may collection documents.
     * @method
     * @param {ObjectID[]} ids The Document identifiers to remove.
     * @returns {Promise<number>}
     */
    removeMany(ids: ObjectID[]): Promise<number>;
    /**
     * Insert a value into a document field array.
     * @method
     * @param {TDocument} document The Document to update.
     * @param {string} field The document field array name.
     * @param {any} value The value to insert in document field array.
     * @returns {Promise<void>}
     */
    insertToFieldArray(document: TDocument, field: string, value: any): Promise<void>;
    /**
     * Remove a value from a document field array.
     * @method
     * @param {TDocument} document The Document to update.
     * @param {string} field The document field array name.
     * @param {any} value The value to remove from the document field array.
     * @returns {Promise<void>}
     */
    removeFromFieldArray(document: TDocument, field: string, value: any): Promise<void>;
    /**
     * Save a collection document. (Insert or update)
     * @method
     * @param {TDocument} document The Document to insert/update.
     * @returns {Promise<TDocument>}
     */
    save(document: TDocument): Promise<TDocument>;
    /**
     * Serialize a document to replace ObjectID by string identifier.
     * @method
     * @param {TDocument} document The Document to insert/update.
     */
    protected serialize(document: TDocument): void;
    /**
     * Gets the query sort object from string.
     * @method
     * @param {string} sort The string query sort to deserialize.
     * @returns {string[][]}
     */
    protected getQuerySort(sort: string): Array<string[]>;
    /**
     * Prepare the filter query from pagination filter.
     * @method
     * @param {Cursor<TDocument>} query The current MongoDB query.
     * @param {PaginationFilter} pagination The requested pagination filter.
     * @returns {Cursor<TDocument>}
     */
    protected preparePaginationQuery(query: Cursor<TDocument>, pagination: PaginationFilter): Cursor<TDocument>;
}
