import { ApiProperty } from '@nestjs/swagger';
import { DashboardSummaryEntity } from '../../domain/entities/dashboard-summary.entity.js';

export class DashboardSummaryResponseDto {
  @ApiProperty({
    description: 'Cantidad de bienes actualmente en inventario (Stock activo disponible)',
    example: 0,
  })
  inventoryAssetsCount: number;

  @ApiProperty({
    description: 'Valor total acumulado de adquisición de los bienes en inventario (Capital en inventario en USD)',
    example: 0.0,
  })
  inventoryAccumulatedValue: number;

  @ApiProperty({
    description: 'Cantidad total de bienes vendidos/desincorporados (Bajas por venta)',
    example: 3,
  })
  soldAssetsCount: number;

  @ApiProperty({
    description: 'Monto total de ingresos generados por ventas (Total comercializado en USD)',
    example: 215623.0,
  })
  salesRevenue: number;
}

export class DashboardSummaryResponseMapper {
  public static fromDomain(entity: DashboardSummaryEntity): DashboardSummaryResponseDto {
    return {
      inventoryAssetsCount: entity.inventoryAssetsCount,
      inventoryAccumulatedValue: Number(entity.inventoryAccumulatedValue.toFixed(2)),
      soldAssetsCount: entity.soldAssetsCount,
      salesRevenue: Number(entity.salesRevenue.toFixed(2)),
    };
  }
}
