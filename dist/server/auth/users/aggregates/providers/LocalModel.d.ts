/**
 * @swagger
 * definitions:
 *   LocalModel:
 *     type: object
 *     required:
 *       - username
 *       - salt
 *       - hash
 *     properties:
 *       username:
 *         type: string
 *       salt:
 *         type: string
 *       hash:
 *         type: string
 */
export declare class LocalModel {
    username: string;
    salt: string;
    hash: string;
}
