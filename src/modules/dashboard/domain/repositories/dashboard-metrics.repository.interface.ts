import { DashboardSummaryEntity } from '../entities/dashboard-summary.entity.js';

export const DASHBOARD_METRICS_REPOSITORY_TOKEN = Symbol('DASHBOARD_METRICS_REPOSITORY_TOKEN');

export interface IDashboardMetricsRepository {
  getSummaryMetrics(): Promise<DashboardSummaryEntity>;
}
