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
export declare class RegisterModel {
    email: string;
    password: string;
    passwordConfirm: string;
    civility: number;
    firstname: string;
    lastname: string;
    avatar?: string;
}
