import { describe, expect, it, vi } from 'vitest';
import { GetDashboardSummaryUseCase } from './get-dashboard-summary.use-case.js';
import { DashboardSummaryEntity } from '../../domain/entities/dashboard-summary.entity.js';
import type { IDashboardMetricsRepository } from '../../domain/repositories/dashboard-metrics.repository.interface.js';

describe('GetDashboardSummaryUseCase', () => {
  it('debe retornar el resumen consolidado formateado a dos decimales', async () => {
    const mockRepo: IDashboardMetricsRepository = {
      getSummaryMetrics: vi.fn().mockResolvedValue(
        new DashboardSummaryEntity({
          inventoryAssetsCount: 0,
          inventoryAccumulatedValue: 0.0,
          soldAssetsCount: 3,
          salesRevenue: 215623.0,
        }),
      ),
    };

    const useCase = new GetDashboardSummaryUseCase(mockRepo);
    const result = await useCase.execute();

    expect(result).toEqual({
      inventoryAssetsCount: 0,
      inventoryAccumulatedValue: 0.0,
      soldAssetsCount: 3,
      salesRevenue: 215623.0,
    });
    expect(mockRepo.getSummaryMetrics).toHaveBeenCalledTimes(1);
  });
});
