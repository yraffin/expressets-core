"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.METADATA_KEY = 'core:metadata';
const _ = require("lodash");
function initializeProperties(property, value) {
    function decorator(target, targetKey) {
        const dynamicType = class {
            constructor() {
                if (_.isMap(property)) {
                    property.forEach((itemValue, itemKey) => {
                        this[itemKey] = itemValue;
                    });
                }
                else if (_.isString(property)) {
                    this[property] = value;
                }
            }
        };
        if (!!targetKey) {
            // property metadata
            const t = Reflect.getMetadata('design:type', target, targetKey);
            Object.setPrototypeOf(dynamicType.prototype, t.prototype);
            Object.setPrototypeOf(dynamicType, t);
            Reflect.defineMetadata('design:type', dynamicType, target, targetKey);
        }
        else {
            // type metadata
            Object.setPrototypeOf(dynamicType.prototype, target.prototype);
            Object.setPrototypeOf(dynamicType, target);
            return dynamicType;
        }
    }
    return decorator;
}
exports.initializeProperties = initializeProperties;
function initializeStaticProperties(property, value) {
    function decorator(target, targetKey) {
        const dynamicType = class {
        };
        if (!!targetKey) {
            // property metadata
            const t = Reflect.getMetadata('design:type', target, targetKey);
            Object.setPrototypeOf(dynamicType.prototype, t.prototype);
            Object.setPrototypeOf(dynamicType, t);
            if (_.isObject(property)) {
                property.forEach((itemValue, itemKey) => {
                    target[itemKey] = itemValue;
                });
            }
            else if (_.isString(property)) {
                t[property] = value;
            }
            Reflect.defineMetadata('design:type', dynamicType, target, targetKey);
        }
        else {
            // type metadata
            if (_.isMap(property)) {
                property.forEach((itemValue, itemKey) => {
                    target[itemKey] = itemValue;
                });
            }
            else if (_.isString(property)) {
                target[property] = value;
            }
            return target;
        }
    }
    return decorator;
}
exports.initializeStaticProperties = initializeStaticProperties;
//# sourceMappingURL=Utils.js.map