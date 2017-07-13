import { MongoService, PaginationFilter } from '../../../core/MongoService';
import { UserModel } from './aggregates/UserModel';
import { RegisterModel } from './aggregates/RegisterModel';
/**
 * Represents the users service.
 * @class
 * @extends {MongoService<UserModel>}
 */
export declare class UsersService extends MongoService<UserModel> {
    /**
     * Create a user.
     * @method
     * @param {RegisterModel} data The user data model.
     * @returns {Promise<UserModel>}
     */
    createUser(data: RegisterModel): Promise<UserModel>;
    /**
     * Encrypt the user password.
     * @method
     * @param {UserModel} user The curretnt user.
     * @param {string} password The user password to encrypt.
     */
    createPassword(user: UserModel, password: string): void;
    /**
     * Check if password is valid.
     * @method
     * @param {UserModel} user The current user.
     * @param {string} password The password to validate.
     * @returns {boolean}
     */
    isValidPassword(user: UserModel, password: string): boolean;
    /**
     * Gets the user rights.
     * @method
     * @param {string} id The current user identifier.
     * @returns {Promise<string[]>}
     */
    getUserRights(id: string): Promise<string[]>;
    /**
     * Save the user rights.
     * @method
     * @param {string} id The current user identifier.
     * @param {string[]} data The list of user rights.
     * @returns {Promise<string[]>}
     */
    saveUserRights(id: string, data: string[]): Promise<string[]>;
}
export { UserModel, RegisterModel, PaginationFilter };
