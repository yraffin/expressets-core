export declare const METADATA_KEY = "core:metadata";
/**
 * Represents a type which is constructable
 * @interface
 */
export interface Class extends Function {
    new (...args: any[]): any;
}
/**
 * Initialize specific property with value.
 * @function
 * @param {string} property The property name to initialize.
 * @param {any} value The value to affect to the specified property.
 * @returns {(target: Object, targetKey?: string | symbol): Class | void}
 */
export declare function initializeProperties(values: Map<string, string>): any;
export declare function initializeProperties(property: string, value: any): any;
/**
 * Initialize specific property with value.
 * @function
 * @param {string} property The property name to initialize.
 * @param {any} value The value to affect to the specified property.
 * @returns {(target: Object, targetKey?: string | symbol): Class | void}
 */
export declare function initializeStaticProperties(values: Map<string, string>): any;
export declare function initializeStaticProperties(property: string, value: any): any;
