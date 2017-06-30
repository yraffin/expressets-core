"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const validators_1 = require("../../../../core/validators");
/**
 * @swagger
 * definitions:
 *   RegisterModel:
 *     type: object
 *     required:
 *       - email
 *       - password
 *     properties:
 *       email:
 *         type: string
 *       password:
 *         type: string
 *       passwordConfirm:
 *         type: string
 *       civility:
 *         type: number
 *       firstname:
 *         type: string
 *       lastname:
 *         type: string
 */
class RegisterModel {
}
__decorate([
    class_validator_1.IsEmail(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], RegisterModel.prototype, "email", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.MinLength(8),
    __metadata("design:type", String)
], RegisterModel.prototype, "password", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    validators_1.IsEqualTo('password'),
    __metadata("design:type", String)
], RegisterModel.prototype, "passwordConfirm", void 0);
__decorate([
    class_validator_1.IsIn([0, 1, 2]),
    __metadata("design:type", Number)
], RegisterModel.prototype, "civility", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], RegisterModel.prototype, "firstname", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], RegisterModel.prototype, "lastname", void 0);
exports.RegisterModel = RegisterModel;
//# sourceMappingURL=RegisterModel.js.map