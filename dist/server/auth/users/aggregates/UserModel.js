"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MongoModelBase_1 = require("../../../../core/MongoModelBase");
/**
 * @swagger
 * definitions:
 *   UserModel:
 *     type: object
 *     required:
 *       - id
 *       - email
 *       - firstname
 *       - lastname
 *     properties:
 *       id:
 *         type: string
 *       email:
 *         type: string
 *       firstname:
 *         type: string
 *       lastname:
 *         type: string
 *       local:
 *         $ref: '#/definitions/LocalModel'
 *       azure:
 *         $ref: '#/definitions/AzureADModel'
 *       rights:
 *           type: array
 *           items:
 *              type: string
 */
class UserModel extends MongoModelBase_1.MongoModelBase {
}
exports.UserModel = UserModel;
//# sourceMappingURL=UserModel.js.map