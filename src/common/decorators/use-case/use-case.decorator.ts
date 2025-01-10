import { UseCaseExecutor } from './use-case.executor';

export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

export const useCases = new Set<{
  url: string;
  variables: string[];
  method: Method;
  useCase: new (...args: any[]) => UseCaseExecutor<any, any>;
}>();

function isUseCase(target: any): target is UseCaseExecutor<any, any> {
  return typeof target.prototype.execute === 'function';
}

export function UseCase<
  T extends { new (...args: any): UseCaseExecutor<any, any> },
>(method: Method, url: string) {
  return function (target: T) {
    if (!isUseCase(target)) {
      throw new Error('ONLY USE CASES ARE PERMITTED!');
    }

    console.info(`${target.name} has been registered`);

    // Extract variables from URL
    const variables =
      url
        .split('/')
        .filter((str) => str.startsWith(':'))
        .map((str) => str.replace(':', '')) || [];

    // Register the use case
    useCases.add({
      method,
      url,
      variables,
      useCase: target,
    });
  };
}
