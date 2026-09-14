import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateSaleUseCase } from '../../../application/use-cases/create-sale.use-case.js';
import { GetSalesUseCase } from '../../../application/use-cases/get-sales.use-case.js';
import { GetSaleByIdUseCase } from '../../../application/use-cases/get-sale-by-id.use-case.js';
import { CreateSaleRequestDto } from '../dtos/create-sale-request.dto.js';
import { SaleResponseDto } from '../../../application/dtos/sale-response.dto.js';

@ApiTags('Sales')
@Controller('sales')
export class SaleController {
  constructor(
    private readonly createSaleUseCase: CreateSaleUseCase,
    private readonly getSalesUseCase: GetSalesUseCase,
    private readonly getSaleByIdUseCase: GetSaleByIdUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Registrar una venta de bienes',
    description:
      'Registra la venta de uno o varios bienes, dejando constancia en el historial de ventas y eliminando automáticamente los bienes vendidos del inventario activo de forma atómica.',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'La venta fue registrada exitosamente y los bienes fueron retirados del inventario.',
    type: SaleResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Datos de entrada inválidos o intento de duplicar un bien en la misma venta.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Uno o más bienes no existen en el inventario o ya fueron vendidos.',
  })
  async create(@Body() createSaleDto: CreateSaleRequestDto): Promise<SaleResponseDto> {
    return this.createSaleUseCase.execute({
      buyerName: createSaleDto.buyerName,
      buyerDocument: createSaleDto.buyerDocument,
      saleDate: createSaleDto.saleDate,
      saleReason: createSaleDto.saleReason,
      items: createSaleDto.items,
    });
  }

  @Get()
  @ApiOperation({
    summary: 'Consultar historial de ventas',
    description: 'Retorna el historial completo de ventas registradas con el detalle de bienes de cada una.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Historial de ventas obtenido exitosamente.',
    type: [SaleResponseDto],
  })
  async findAll(): Promise<SaleResponseDto[]> {
    return this.getSalesUseCase.execute();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Consultar una venta por ID',
    description: 'Obtiene el detalle completo de una venta específica y sus bienes asociados.',
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador único UUID de la venta',
    example: '8a5c3210-911e-42ab-bbef-81a1a5b6c001',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Detalle de la venta encontrado.',
    type: SaleResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'La venta solicitada no existe en el sistema.',
  })
  async findById(@Param('id') id: string): Promise<SaleResponseDto> {
    return this.getSaleByIdUseCase.execute(id);
  }
}
