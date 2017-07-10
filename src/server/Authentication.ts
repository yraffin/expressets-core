import { Container, Inject } from 'typedi';

import { Auth } from '../configuration';
import { logger } from '../core/logging';

@Inject()
export class Authentication {

  setupAuth(app) {
    logger.info('no authentication define.')
  }
}
