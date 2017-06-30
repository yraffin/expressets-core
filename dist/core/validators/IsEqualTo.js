"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
/**
 * Represents a validator  constraint
 * @class
 */
let IsEqualToConstraint = class IsEqualToConstraint {
    /**
     * Called to validate a property value.
     * @method
     * @param {any} value The current property value to validate.
     * @param {ValidationArguments} args The context validation arguments.
     * @returns {boolean}
     */
    validate(value, args) {
        const property = args.constraints[0];
        if (!property) {
            return false;
        }
        if (!args.object.hasOwnProperty(property)) {
            return false;
        }
        return value === args.object[property];
    }
    defaultMessage(args) {
        return `'${args.property}' is not equal to '${args.constraints[0]}'`;
    }
};
IsEqualToConstraint = __decorate([
    class_validator_1.ValidatorConstraint({ name: 'isEqualTo', async: false })
], IsEqualToConstraint);
exports.IsEqualToConstraint = IsEqualToConstraint;
/**
 * Represents the 'IsEqualTo' validation annotation.
 * @method
 * @param {string} property The property used to check equality.
 * @param {ValidationOptions} validationOptions The validation options.
 * @returns {Function}
 */
function IsEqualTo(property, validationOptions) {
    return function (object, propertyName) {
        class_validator_1.registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [property],
            validator: IsEqualToConstraint
        });
    };
}
exports.IsEqualTo = IsEqualTo;
//# sourceMappingURL=IsEqualTo.js.map