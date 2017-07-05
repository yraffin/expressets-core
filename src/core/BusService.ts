import { Container, Service } from 'typedi';
import * as azure from 'azure';

import { Bus } from '../configuration';
import { logger } from '../core/logging';

const request = 'request';
const response = 'response';
/**
 * Represents the base mongo service.
 * @class
 */
@Service()
export abstract class BusService {

  /** name of the queue @protected @property {string} */
  protected abstract name: string;

  /** Is sender @protected @property {boolean} */
  protected abstract isSender: boolean;

  /** Service bus */
  private serviceBus: any;

  /** name request queue */
  private get nameRequest() {
    return this.name + request;
  };

  /** name request queue */
  private get nameResponse() {
    return this.name + response;
  }

  constructor(name: string) {
    this.name = name;
    const config = Container.get(Bus);
    this.serviceBus = azure.createServiceBusService(config.connectionString);
    this.serviceBus.createQueueIfNotExists(this.nameRequest, (error) => {
      this.logError(`Connection to Azure Service Bus '${this.nameRequest}'`, error);
    });
    this.serviceBus.createQueueIfNotExists(this.nameResponse, (error) => {
      this.logError(`Connection to Azure Service Bus '${this.nameRequest}'`, error);
    });

    this.receiveMessage(this.onReceiveMessage);
    logger.info(`Bus '${this.name}' Instancied`);
  }

  /** Utils to send message */
  sendMessage(message: any) {
    this.serviceBus.sendQueueMessage(this.isSender ? this.nameRequest : this.nameResponse, message, (error) => {
      this.logError(`Message sent to queue '${this.isSender ? this.nameRequest : this.nameResponse}'`, error);
      logger.debug('Message sent:', message);
    });

  }

  /** Receive message */
  abstract onReceiveMessage(message: any);

  /** Utils to recive message */
  private receiveMessage(callback) {
    this.serviceBus.receiveQueueMessage(this.isSender ? this.nameResponse : this.nameRequest, (error, message) => {
      if (message) {
        callback(message);
      }

      this.receiveMessage(this.onReceiveMessage);
      // this.logError(`Message received from queue '${this.isSender ? this.nameResponse : this.nameRequest}'`, error);
      // logger.debug('Message received:', message);
    });
  }

  /**
   * Log an error if occurred.
   * @method
   * @param {string} message The message to log on error.
   * @param {any} error The current error.
   */
  private logError(message: string, error: any) {
    if (!error) {
      logger.debug(`${message} succeeded.`);
      return;
    }

    logger.error(message, error.message);
    logger.debug(error);
  }
}
