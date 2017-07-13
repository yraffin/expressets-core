import { MongoModelBase } from '../../../../core/MongoModelBase';
import { LocalModel, AzureADModel } from './providers';
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
export declare class UserModel extends MongoModelBase {
    email: string;
    firstname: string;
    lastname: string;
    providers: {
        local?: LocalModel;
        azure?: AzureADModel;
    };
    rights?: string[];
}
