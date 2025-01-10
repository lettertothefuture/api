export type ErrorStatus = 400 | 401 | 403 | 404 | 500 | 501 | 504;

export class HttpError extends Error {
  readonly status: ErrorStatus;
  readonly time: Date;

  private constructor(status: ErrorStatus, message: string) {
    const time = new Date();

    super(`Status: ${status}:::${message}::: at ${time.toISOString()}`);

    this.status = status;
    this.time = time;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  static badRequest(message: string) {
    return new HttpError(400, message);
  }

  static unauthorized(message: string) {
    return new HttpError(401, message);
  }

  static forbidden(message: string) {
    return new HttpError(403, message);
  }

  static notFound(message: string) {
    return new HttpError(404, message);
  }

  static internalServerError(message: string) {
    return new HttpError(500, message);
  }

  static notImplemented(message: string) {
    return new HttpError(501, message);
  }

  static gatewayTimeout(message: string) {
    return new HttpError(504, message);
  }
}
