"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AuthTokenModel_1 = require("./AuthTokenModel");
/**
 * @swagger
 * definitions:
 *   AuthModel:
 *     type: object
 *     properties:
 *       token:
 *         type: string
 *       refresh:
 *         type: string
 */
class AuthModel extends AuthTokenModel_1.AuthTokenModel {
}
exports.AuthModel = AuthModel;
//# sourceMappingURL=AuthModel.js.map