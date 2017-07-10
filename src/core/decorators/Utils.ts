export const METADATA_KEY = 'core:metadata';
import * as _ from 'lodash';

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
export function initializeProperties(values: Map<string, string>);
export function initializeProperties(property: string, value: any);
export function initializeProperties(property: string | Map<string, string>, value?: any) {
  function decorator(target: Class): Class | void;
  function decorator(target: object, targetKey: string | symbol): void;
  function decorator(target: object, targetKey?: string | symbol): Class | void {
    const dynamicType = class {
      constructor() {
        if (_.isMap(property)) {
          (property as Map<string, string>).forEach((itemValue, itemKey) => {
            this[itemKey] = itemValue;
          });
        } else if (_.isString(property)) {
          this[property as string] = value;
        }
      }
    };
    if (!!targetKey) {
      // property metadata
      const t = Reflect.getMetadata('design:type', target, targetKey);

      Object.setPrototypeOf(dynamicType.prototype, t.prototype);
      Object.setPrototypeOf(dynamicType, t);

      Reflect.defineMetadata('design:type', dynamicType, target, targetKey);
    } else {
      // type metadata
      Object.setPrototypeOf(dynamicType.prototype, (target as FunctionConstructor).prototype);
      Object.setPrototypeOf(dynamicType, target);
      return dynamicType;
    }
  }

  return decorator;
}

/**
 * Initialize specific property with value.
 * @function
 * @param {string} property The property name to initialize.
 * @param {any} value The value to affect to the specified property.
 * @returns {(target: Object, targetKey?: string | symbol): Class | void}
 */
export function initializeStaticProperties(values: Map<string, string>);
export function initializeStaticProperties(property: string, value: any);
export function initializeStaticProperties(property: string | Map<string, string>, value?: any) {
  function decorator(target: Class): Class | void;
  function decorator(target: object, targetKey: string | symbol): void;
  function decorator(target: object, targetKey?: string | symbol): Class | void {
    const dynamicType = class { };
    if (!!targetKey) {
      // property metadata
      const t = Reflect.getMetadata('design:type', target, targetKey);

      Object.setPrototypeOf(dynamicType.prototype, t.prototype);
      Object.setPrototypeOf(dynamicType, t);

      if (_.isObject(property)) {
        (property as Map<string, string>).forEach((itemValue, itemKey) => {
          target[itemKey] = itemValue;
        });
      } else if (_.isString(property)) {
        t[property as string] = value;
      }

      Reflect.defineMetadata('design:type', dynamicType, target, targetKey);
    } else {
      // type metadata
      if (_.isMap(property)) {
        (property as Map<string, string>).forEach((itemValue, itemKey) => {
          target[itemKey] = itemValue;
        });
      } else if (_.isString(property)) {
        target[property as string] = value;
      }

      return target as Class;
    }
  }

  return decorator;
}
