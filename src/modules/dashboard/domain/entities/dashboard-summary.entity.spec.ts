import { describe, expect, it } from 'vitest';
import { DashboardSummaryEntity } from './dashboard-summary.entity.js';

describe('DashboardSummaryEntity', () => {
  it('debe instanciar correctamente las métricas con los valores proporcionados', () => {
    const summary = new DashboardSummaryEntity({
      inventoryAssetsCount: 0,
      inventoryAccumulatedValue: 0.0,
      soldAssetsCount: 3,
      salesRevenue: 215623.0,
    });

    expect(summary.inventoryAssetsCount).toBe(0);
    expect(summary.inventoryAccumulatedValue).toBe(0.0);
    expect(summary.soldAssetsCount).toBe(3);
    expect(summary.salesRevenue).toBe(215623.0);
  });

  it('debe manejar valores nulos o indefinidos convirtiéndolos a 0', () => {
    const summary = new DashboardSummaryEntity({
      inventoryAssetsCount: null as any,
      inventoryAccumulatedValue: undefined as any,
      soldAssetsCount: NaN as any,
      salesRevenue: null as any,
    });

    expect(summary.inventoryAssetsCount).toBe(0);
    expect(summary.inventoryAccumulatedValue).toBe(0);
    expect(summary.soldAssetsCount).toBe(0);
    expect(summary.salesRevenue).toBe(0);
  });
});
