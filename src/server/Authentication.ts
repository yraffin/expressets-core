import { Container, Inject } from 'typedi';

import { Auth } from '../configuration';
import { logger } from '../core/logging';
import { setupB2CLoginAuth, IsLogged } from './auth/AzureLoginStrategy';

export { IsLogged };

@Inject()
export class Authentication {

  setupAuth(app) {
    setupB2CLoginAuth(app);
  }
}
