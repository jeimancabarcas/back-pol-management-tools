import { Module } from '@nestjs/common';
import { DASHBOARD_METRICS_REPOSITORY_TOKEN } from './domain/repositories/dashboard-metrics.repository.interface.js';
import { GetDashboardSummaryUseCase } from './application/use-cases/get-dashboard-summary.use-case.js';
import { DashboardMetricsTypeOrmRepository } from './infrastructure/persistence/repositories/dashboard-metrics.typeorm.repository.js';
import { DashboardController } from './infrastructure/http/controllers/dashboard.controller.js';

@Module({
  controllers: [DashboardController],
  providers: [
    GetDashboardSummaryUseCase,
    {
      provide: DASHBOARD_METRICS_REPOSITORY_TOKEN,
      useClass: DashboardMetricsTypeOrmRepository,
    },
  ],
  exports: [GetDashboardSummaryUseCase],
})
export class DashboardModule {}
