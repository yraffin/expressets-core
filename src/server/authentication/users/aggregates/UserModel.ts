import { MongoModelBase } from '../../../../core/MongoModelBase';
import { LocalModel } from './providers';

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
 *       avatar:
 *         type: string
 *       refresh:
 *         type: string
 *       local:
 *         $ref: '#/definitions/LocalModel'
 *       rights:
 *           type: array
 *           items:
 *              type: string
 */
export class UserModel extends MongoModelBase {
  email: string;
  firstname: string;
  lastname: string;
  avatar?: string;
  civility: number;
  refresh?: string;
  isSystem?: boolean;
  providers: {
    local?: LocalModel;
  };
  rights?: string[];
  birthdate?: Date;
  address?: any;
  phone?: string;
  mobile?: string;
}
