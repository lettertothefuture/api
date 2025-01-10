export class Result<Success, Failure> {
  private readonly _success: Success | undefined;
  private readonly _failure: Failure | undefined;

  private constructor(
    success: Success | undefined,
    failure: Failure | undefined,
  ) {
    this._success = success;
    this._failure = failure;
  }

  public isSuccess(): this is Result<Success, undefined> {
    return this._failure === undefined;
  }

  public isFailure(): this is Result<undefined, Failure> {
    return this._success === undefined;
  }

  public value(): Success | Failure {
    if (this.isSuccess()) {
      return this._success as Success;
    }
    if (this.isFailure()) {
      return this._failure as Failure;
    }

    throw new Error('Invalid state: Result must be either success or failure.');
  }

  static ok<Success>(success: Success): Result<Success, undefined> {
    return new Result(success, undefined);
  }

  static failure<Failure>(failure: Failure): Result<undefined, Failure> {
    return new Result(undefined, failure);
  }

  static combine(...results: Result<any, any>[]): Result<any[] | undefined, any[] | undefined> {
    const successes: any[] = [];
    const failures: any[] = [];

    for (const result of results) {
      if (result.isSuccess()) {
        successes.push(result.value());
      } else {
        failures.push(result.value());
      }
    }

    return failures.length > 0
      ? Result.failure(failures)
      : Result.ok(successes);
  }
}
