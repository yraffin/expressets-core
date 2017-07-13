"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const bcrypt = require("bcrypt-nodejs");
const MongoService_1 = require("../../../core/MongoService");
exports.PaginationFilter = MongoService_1.PaginationFilter;
const decorators_1 = require("../../../core/decorators");
const UserModel_1 = require("./aggregates/UserModel");
exports.UserModel = UserModel_1.UserModel;
const RegisterModel_1 = require("./aggregates/RegisterModel");
exports.RegisterModel = RegisterModel_1.RegisterModel;
/**
 * Represents the users service.
 * @class
 * @extends {MongoService<UserModel>}
 */
let UsersService = class UsersService extends MongoService_1.MongoService {
    /**
     * Create a user.
     * @method
     * @param {RegisterModel} data The user data model.
     * @returns {Promise<UserModel>}
     */
    createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = {
                email: data.email,
                civility: data.civility,
                firstname: data.firstname,
                lastname: data.lastname,
                providers: {
                    local: {
                        username: data.email,
                        salt: '',
                        hash: ''
                    }
                }
            };
            this.createPassword(user, data.password);
            return this.save(user);
        });
    }
    /**
     * Encrypt the user password.
     * @method
     * @param {UserModel} user The curretnt user.
     * @param {string} password The user password to encrypt.
     */
    createPassword(user, password) {
        user.providers.local.salt = bcrypt.genSaltSync(8);
        user.providers.local.hash = bcrypt.hashSync(password, user.providers.local.salt);
    }
    /**
     * Check if password is valid.
     * @method
     * @param {UserModel} user The current user.
     * @param {string} password The password to validate.
     * @returns {boolean}
     */
    isValidPassword(user, password) {
        return bcrypt.compareSync(password, user.providers.local.hash);
    }
    /**
     * Gets the user rights.
     * @method
     * @param {string} id The current user identifier.
     * @returns {Promise<string[]>}
     */
    getUserRights(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.get(id, { fields: { rights: 1 } });
            if (!user) {
                throw new routing_controllers_1.NotFoundError(`user not found: ${id}`);
            }
            return user.rights;
        });
    }
    /**
     * Save the user rights.
     * @method
     * @param {string} id The current user identifier.
     * @param {string[]} data The list of user rights.
     * @returns {Promise<string[]>}
     */
    saveUserRights(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.get(id, { fields: { rights: 1 } });
            if (!user) {
                throw new routing_controllers_1.NotFoundError(`user not found: ${id}`);
            }
            user.rights = data;
            yield this.updateOne(user);
            return data;
        });
    }
};
UsersService = __decorate([
    decorators_1.MongoCollection(UserModel_1.UserModel)
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=UsersService.js.map