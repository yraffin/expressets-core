/**
 * @swagger
 * definitions:
 *   CredentialModel:
 *     type: object
 *     required:
 *       - email
 *       - password
 *     properties:
 *       email:
 *         type: string
 *       password:
 *         type: string
 */
export declare class CredentialModel {
    email: string;
    password: string;
}
