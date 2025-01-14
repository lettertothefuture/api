import { UseCaseResponse } from '@/common/decorators';

export interface HealthCheckOutput extends UseCaseResponse {
  status: string;
}
