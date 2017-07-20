import { ValidationOptions, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
/**
 * Represents a validator  constraint
 * @class
 */
export declare class IsEqualToConstraint implements ValidatorConstraintInterface {
    /**
     * Called to validate a property value.
     * @method
     * @param {any} value The current property value to validate.
     * @param {ValidationArguments} args The context validation arguments.
     * @returns {boolean}
     */
    validate(value: any, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
/**
 * Represents the 'IsEqualTo' validation annotation.
 * @method
 * @param {string} property The property used to check equality.
 * @param {ValidationOptions} validationOptions The validation options.
 * @returns {Function}
 */
export declare function IsEqualTo(property: string, validationOptions?: ValidationOptions): (object: any, propertyName: string) => void;
