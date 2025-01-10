import pino, { Logger } from 'pino';

export class AppLogger {
  private static _logger: Logger | undefined;

  private static get logger(): Logger {
    if (!this._logger) {
      this._logger = pino();
    }

    return this._logger;
  }

  static info(context: string, message: string) {
    this.logger.info(`[${context}]::::${message}`);
  }

  static error(context: string, message: string) {
    this.logger.error(`[${context}]::::${message}`);
  }

  static warning(context: string, message: string) {
    this.logger.warn(`[${context}]::::${message}`);
  }

  static trace(context: string, message: string) {
    this.logger.trace(`[${context}]::::${message}`);
  }

  static fatal(context: string, message: string) {
    this.logger.fatal(`[${context}]::::${message}`);
  }
}
