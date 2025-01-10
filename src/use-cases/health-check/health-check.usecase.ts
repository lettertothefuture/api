import { injectable } from 'tsyringe';
import { UseCase, UseCaseExecutor } from '@/common/decorators';
import { HealthCheckOutput } from './health-check.output';
import { HttpError } from '@/common/errors';
import { Result } from '@/common/utils';

@injectable()
@UseCase('GET', '/health')
export class HealthCheck implements UseCaseExecutor<void, HealthCheckOutput> {
  async execute(
    _: void,
  ): Promise<Result<HealthCheckOutput, HttpError | undefined>> {
    return Result.ok({
      status: 'ALIVE',
      responseStatus: 200,
    } satisfies HealthCheckOutput);
  }
}
