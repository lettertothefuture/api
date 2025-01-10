export type SuccessStatus = 200 | 201 | 202 | 204;

export interface UseCaseResponse {
  responseStatus: SuccessStatus;
}
