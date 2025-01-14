export class Result<Success, Failure> {
  private readonly success: Success | undefined;
  private readonly failure: Failure | undefined;
  private readonly _isSuccess: boolean;

  private constructor(
    success: Success | undefined,
    failure: Failure | undefined,
    isSuccess: boolean
  ) {
    this.success = success;
    this.failure = failure;
    this._isSuccess = isSuccess;
  }

  public isSuccess(): this is Result<Success, undefined> {
    return this._isSuccess === true;
  }


  public isFailure(): this is Result<undefined, Failure> {
    return this._isSuccess === false;
  }

  public value(): Success | Failure {
    if (this.isSuccess()) {
      return this.success as Success;
    }

    if (this.isFailure()) {
      return this.failure as Failure;
    }

    throw new Error('Invalid state: Result must be either success or failure.');
  }

  static ok<Success, Failure>(success: Success): Result<Success, Failure> {
    return new Result<Success, Failure>(success, undefined, true);
  }

  static failure<Success, Failure>(failure: Failure): Result<Success, Failure> {
    return new Result<Success, Failure>(undefined, failure, false);
  }

  static combine(
    ...results: Result<any, any>[]
  ): Result<any[] | undefined, any[] | undefined> {
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
