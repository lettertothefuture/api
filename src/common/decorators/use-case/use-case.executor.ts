import { HttpError } from '@/common/errors';
import { Result } from '@/common/utils';
import { UseCaseResponse } from './use-case.response';

export interface UseCaseExecutor<Input, Output extends UseCaseResponse> {
  execute(input: Input): Promise<Result<Output, HttpError | undefined>>;
}
