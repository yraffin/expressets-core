"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const mongodb_1 = require("mongodb");
const Mongo_1 = require("../server/Mongo");
const PaginationFilter_1 = require("./PaginationFilter");
exports.PaginationFilter = PaginationFilter_1.PaginationFilter;
/**
 * Represents the base mongo service.
 * @class
 */
let MongoService = class MongoService {
    /**
     * Gets a MongoDB collection.
     * @method
     * @param {string} name The name of the requested collection.
     * @returns {Promise<Collection>}
     */
    collection(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this.mongodb.db();
            return db.collection(name || this.collectionName);
        });
    }
    /**
     * Gets a list of collection documents depends on the pagination filter.
     * @method
     * @param {PaginationFilter} pagination The requested pagination filter.
     * @returns {Promise<TDocument[]>}
     */
    all(pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            const col = yield this.collection();
            const query = col.find();
            this.preparePaginationQuery(query, pagination);
            const documents = yield query.toArray();
            // tslint:disable-next-line:arrow-parens
            (documents || []).forEach(item => this.serialize(item));
            return documents;
        });
    }
    /**
     * Gets a list of collection documents depends on query and pagination filter.
     * @method
     * @param {Object} query The query filter.
     * @param {PaginationFilter} pagination The requested pagination filter.
     * @returns {Promise<TDocument[]>}
     */
    find(query, pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            const col = yield this.collection();
            const cursor = col.find(query);
            this.preparePaginationQuery(cursor, pagination);
            const documents = yield cursor.toArray();
            (documents || []).forEach((item) => this.serialize(item));
            return documents;
        });
    }
    /**
     * Gets a list of collection partial documents depends on query and pagination filter.
     * Only document properties defined in projection Object would be returned.
     * @method
     * @param {Object} query The query filter.
     * @param {Object} projection The document properties projection to request.
     * @param {PaginationFilter} pagination The requested pagination filter.
     * @returns {Promise<TDocument[]>}
     */
    filter(query, projection, pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            const col = yield this.collection();
            let cursor = col.find(query);
            cursor = this.preparePaginationQuery(cursor, pagination);
            const documents = yield cursor.project(projection).toArray();
            (documents || []).forEach((item) => this.serialize(item));
            return documents;
        });
    }
    /**
     * Gets the number of collection documents depends on query and pagination filter.
     * @method
     * @param {Object} query The query filter.
     * @returns {Promise<number>}
     */
    count(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const col = yield this.collection();
            return col.count(query || {});
        });
    }
    /**
     * Gets a document by its identifier.
     * @method
     * @param {string} id The requested document identifier.
     * @param {FindOneOptions} options The request options.
     * @returns {Promise<TDocument>}
     */
    get(id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const col = yield this.collection();
            const document = yield col.findOne({ _id: mongodb_1.ObjectID.createFromHexString(id) }, options);
            this.serialize(document);
            return document;
        });
    }
    /**
     * Gets the first document solving the filter query.
     * @method
     * @param {Object} filter The requested filter.
     * @param {FindOneOptions} options The request options.
     * @returns {Promise<TDocument>}
     */
    findOne(filter, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const col = yield this.collection();
            const document = yield col.findOne(filter, options);
            this.serialize(document);
            return document;
        });
    }
    /**
     * Insert one document to the collection.
     * @method
     * @param {TDocument} document The Document to insert.
     * @returns {Promise<TDocument>}
     */
    insertOne(document) {
        return __awaiter(this, void 0, void 0, function* () {
            const col = yield this.collection();
            const inserted = yield col.insertOne(document);
            return yield this.get(inserted.insertedId.toHexString());
        });
    }
    /**
     * Insert many documents to the collection.
     * @method
     * @param {TDocument[]} documents The Documents to insert.
     * @returns {Promise<TDocument[]>}
     */
    insertMany(documents) {
        return __awaiter(this, void 0, void 0, function* () {
            const col = yield this.collection();
            const inserted = yield col.insertMany(documents);
            return yield this.find({ _id: { $in: inserted.insertedIds } });
        });
    }
    /**
     * Update a collection document.
     * @method
     * @param {TDocument} document The Document to update.
     * @param {boolean} replace Value indicating whether to replace the entire document or partially update.
     * @returns {Promise<TDocument>}
     */
    updateOne(document, replace) {
        return __awaiter(this, void 0, void 0, function* () {
            const col = yield this.collection();
            const id = document.id;
            const _id = mongodb_1.ObjectID.createFromHexString(id);
            delete document.id;
            const update = replace ? document : { $set: document };
            const updated = yield col.updateOne({ _id }, update);
            return yield this.get(id);
        });
    }
    /**
     * Remove collection document.
     * @method
     * @param {string} id The Document identifier to remove.
     * @returns {Promise<number>}
     */
    removeOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const col = yield this.collection();
            const _id = mongodb_1.ObjectID.createFromHexString(id);
            const result = yield col.deleteOne({ _id });
            return result.deletedCount;
        });
    }
    /**
     * Remove may collection documents.
     * @method
     * @param {ObjectID[]} ids The Document identifiers to remove.
     * @returns {Promise<number>}
     */
    removeMany(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const col = yield this.collection();
            const result = yield col.deleteMany({ _id: { $in: ids || [] } });
            return result.deletedCount;
        });
    }
    /**
     * Insert a value into a document field array.
     * @method
     * @param {TDocument} document The Document to update.
     * @param {string} field The document field array name.
     * @param {any} value The value to insert in document field array.
     * @returns {Promise<void>}
     */
    insertToFieldArray(document, field, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const col = yield this.collection();
            const _id = mongodb_1.ObjectID.createFromHexString(document.id);
            const $push = {};
            $push[field] = value;
            const push = { $push };
            yield col.updateOne({ _id }, push);
        });
    }
    /**
     * Remove a value from a document field array.
     * @method
     * @param {TDocument} document The Document to update.
     * @param {string} field The document field array name.
     * @param {any} value The value to remove from the document field array.
     * @returns {Promise<void>}
     */
    removeFromFieldArray(document, field, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const col = yield this.collection();
            const _id = mongodb_1.ObjectID.createFromHexString(document.id);
            const $pull = {};
            $pull[field] = value;
            const pull = { $pull };
            yield col.updateOne({ _id }, pull);
        });
    }
    /**
     * Save a collection document. (Insert or update)
     * @method
     * @param {TDocument} document The Document to insert/update.
     * @returns {Promise<TDocument>}
     */
    save(document) {
        return __awaiter(this, void 0, void 0, function* () {
            if (document.id) {
                return yield this.updateOne(document);
            }
            return yield this.insertOne(document);
        });
    }
    /**
     * Serialize a document to replace ObjectID by string identifier.
     * @method
     * @param {TDocument} document The Document to insert/update.
     */
    serialize(document) {
        if (!document || !document._id) {
            return;
        }
        document.id = document._id.toHexString();
        delete document._id;
    }
    /**
     * Gets the query sort object from string.
     * @method
     * @param {string} sort The string query sort to deserialize.
     * @returns {string[][]}
     */
    getQuerySort(sort) {
        if (!sort || sort.replace(/ /gi, '') === '') {
            return null;
        }
        const querySort = [];
        sort.split(',').forEach((column) => {
            const parts = column.split(':');
            if (parts.length !== 2) {
                throw new Error('sorting column format error : ' + column);
            }
            querySort.push([parts[0], parts[1].toLowerCase()]);
        });
        return querySort;
    }
    /**
     * Prepare the filter query from pagination filter.
     * @method
     * @param {Cursor<TDocument>} query The current MongoDB query.
     * @param {PaginationFilter} pagination The requested pagination filter.
     * @returns {Cursor<TDocument>}
     */
    preparePaginationQuery(query, pagination) {
        const querySort = this.getQuerySort(pagination && pagination.sort);
        if (!!querySort) {
            query = query.sort(querySort);
        }
        const limit = parseInt((pagination && pagination.limit || 0).toString(), 10) || 0;
        const page = parseInt((pagination && pagination.page || 0).toString(), 10) || 0;
        if (limit > 0 && page > 0) {
            query = query.skip(limit * (page - 1)).limit(limit);
        }
        return query;
    }
};
__decorate([
    typedi_1.Inject(),
    __metadata("design:type", Mongo_1.Mongo)
], MongoService.prototype, "mongodb", void 0);
MongoService = __decorate([
    typedi_1.Service()
], MongoService);
exports.MongoService = MongoService;
//# sourceMappingURL=MongoService.js.map