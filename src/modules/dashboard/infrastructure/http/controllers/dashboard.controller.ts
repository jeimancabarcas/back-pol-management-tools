import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetDashboardSummaryUseCase } from '../../../application/use-cases/get-dashboard-summary.use-case.js';
import { DashboardSummaryResponseDto } from '../../../application/dtos/dashboard-summary-response.dto.js';

@ApiTags('Dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly getDashboardSummaryUseCase: GetDashboardSummaryUseCase) {}

  @Get('summary')
  @ApiOperation({
    summary: 'Consultar métricas consolidadas (Dashboard / Inventario)',
    description:
      'Retorna el total de bienes en inventario, valor activo acumulado, bienes vendidos e ingresos totales por ventas.',
  })
  @ApiResponse({
    status: 200,
    description: 'Métricas consolidadas obtenidas exitosamente.',
    type: DashboardSummaryResponseDto,
  })
  async getSummary(): Promise<DashboardSummaryResponseDto> {
    return this.getDashboardSummaryUseCase.execute();
  }
}
