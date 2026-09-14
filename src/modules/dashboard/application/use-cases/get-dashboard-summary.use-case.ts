import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from '../../../../core/application/use-case.interface.js';
import {
  DASHBOARD_METRICS_REPOSITORY_TOKEN,
  type IDashboardMetricsRepository,
} from '../../domain/repositories/dashboard-metrics.repository.interface.js';
import {
  DashboardSummaryResponseDto,
  DashboardSummaryResponseMapper,
} from '../dtos/dashboard-summary-response.dto.js';

@Injectable()
export class GetDashboardSummaryUseCase implements IUseCase<void, DashboardSummaryResponseDto> {
  constructor(
    @Inject(DASHBOARD_METRICS_REPOSITORY_TOKEN)
    private readonly metricsRepository: IDashboardMetricsRepository,
  ) {}

  async execute(): Promise<DashboardSummaryResponseDto> {
    const summaryEntity = await this.metricsRepository.getSummaryMetrics();
    return DashboardSummaryResponseMapper.fromDomain(summaryEntity);
  }
}
