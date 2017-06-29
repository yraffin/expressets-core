import * as winston from 'winston';

export const logger = new winston.Logger();

process.on('unhandledRejection', (reason, p) => {
  logger.error('Possibly Unhandled Rejection at: Promise ', p, ' reason: ', reason);
});

process.on('uncaughtException', (err) => {
  logger.error('Possibly Unhandled Exception reason: ', err);
});
