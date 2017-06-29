"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Utils_1 = require("./Utils");
/**
 * Represents the @MongoCollectionClass<TModel>() decorator.
 * @function
 */
function MongoCollection(ctor) {
    const name = ctor.name.substring(0, ctor.name.lastIndexOf('Model')) + 's';
    return Utils_1.initializeProperties('collectionName', name);
}
exports.MongoCollection = MongoCollection;
//# sourceMappingURL=MongoCollection.js.map