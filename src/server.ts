import { CurrentEnvironment } from '@/environment';
import { registerUseCases } from '@/use-cases';
import fastify from 'fastify';

const app = fastify({
  logger: CurrentEnvironment.isDev
    ? {
        transport: {
          target: 'pino-pretty',
          options: {
            translateTime: 'HH:MM:ss Z',
            ignore: 'pid,hostname',
          },
        },
      }
    : true,
});

registerUseCases(app);

export function start(): Promise<string[]> {
  const { port, host, name } = CurrentEnvironment;

  return app
    .listen({
      port,
      host,
    })
    .then((address) => [address, name]);
}
