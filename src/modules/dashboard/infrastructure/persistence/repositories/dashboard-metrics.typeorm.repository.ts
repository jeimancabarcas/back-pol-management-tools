import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { DashboardSummaryEntity } from '../../../domain/entities/dashboard-summary.entity.js';
import { IDashboardMetricsRepository } from '../../../domain/repositories/dashboard-metrics.repository.interface.js';

@Injectable()
export class DashboardMetricsTypeOrmRepository implements IDashboardMetricsRepository {
  constructor(private readonly dataSource: DataSource) {}

  async getSummaryMetrics(): Promise<DashboardSummaryEntity> {
    // 1. Métricas de inventario activo (Bienes en stock y su valor acumulado)
    const inventoryResult = await this.dataSource.query(`
      SELECT 
        COUNT(*)::int AS "count", 
        COALESCE(SUM("acquisition_value"), 0)::float AS "totalValue" 
      FROM "assets"
    `);

    // 2. Métricas de ventas (Cantidad de bienes vendidos e ingresos totales)
    const salesResult = await this.dataSource.query(`
      SELECT 
        COUNT(*)::int AS "count", 
        COALESCE(SUM("sale_price"), 0)::float AS "totalRevenue" 
      FROM "sale_items"
    `);

    const inventoryAssetsCount = inventoryResult[0]?.count ?? 0;
    const inventoryAccumulatedValue = inventoryResult[0]?.totalValue ?? 0;
    const soldAssetsCount = salesResult[0]?.count ?? 0;
    const salesRevenue = salesResult[0]?.totalRevenue ?? 0;

    return new DashboardSummaryEntity({
      inventoryAssetsCount,
      inventoryAccumulatedValue,
      soldAssetsCount,
      salesRevenue,
    });
  }
}
