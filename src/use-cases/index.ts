import './health-check/health-check.usecase';

import { useCases } from "@/common/decorators";
import { FastifyInstance } from "fastify";
import { container } from 'tsyringe';

export function registerUseCases(app: FastifyInstance) {
    for (const { method, url, variables, useCase } of useCases) {
      app.route({
        method,
        url,
        handler: async (request, reply) => {
          const body: any = request.body;
          const requestParams = request.params as any;
          const params = variables.map((variable) => ({
            [variable]: requestParams[variable],
          }));
          const instance = container.resolve(useCase);
          const result = await instance.execute({
            ...body,
            ...params,
          });
    
          if (result.isFailure()) {
            const error = result.value();
            reply.status(error!.status).send({
              error: {
                message: error!.message,
                at: error!.time,
              },
            });
          }
    
          const { responseStatus, ...response } = result.value();
    
          if (!response) {
            reply.status(responseStatus).send();
          } else {
            reply.status(responseStatus).send({
              data: response,
            });
          }
        },
      });
    }
}