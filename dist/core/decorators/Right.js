"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Utils_1 = require("./Utils");
/**
 * Represents the @MongoCollection(name: {string}) decorator.
 * @function
 * @param {string} name The mongodb collection name.
 */
function Right(name) {
    const baseRights = new Map([
        ['CREATE', `R_API_${name.toUpperCase()}_C`],
        ['READ', `R_API_${name.toUpperCase()}_R`],
        ['UPDATE', `R_API_${name.toUpperCase()}_U`],
        ['DELETE', `R_API_${name.toUpperCase()}_D`],
    ]);
    return Utils_1.initializeStaticProperties(baseRights);
}
exports.Right = Right;
//# sourceMappingURL=Right.js.map