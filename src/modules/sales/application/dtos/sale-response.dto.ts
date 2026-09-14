import { ApiProperty } from '@nestjs/swagger';
import { SaleEntity, SaleItemEntity } from '../../domain/entities/sale.entity.js';

export class SaleItemResponseDto {
  @ApiProperty({
    description: 'Identificador único del detalle de venta',
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  })
  id: string;

  @ApiProperty({
    description: 'ID del bien vendido',
    example: 'd9b2d63d-a233-4123-8478-f0923055f2d6',
  })
  assetId: string;

  @ApiProperty({
    description: 'Nombre del bien al momento de la venta',
    example: 'Laptop Lenovo ThinkPad T14s Gen 4',
  })
  assetName: string;

  @ApiProperty({
    description: 'Precio individual de venta del bien',
    example: 950.0,
  })
  salePrice: number;
}

export class SaleResponseDto {
  @ApiProperty({
    description: 'Identificador único de la venta (UUID)',
    example: '8a5c3210-911e-42ab-bbef-81a1a5b6c001',
  })
  id: string;

  @ApiProperty({
    description: 'Nombre completo del comprador',
    example: 'Carlos Alberto Rodríguez Pérez',
  })
  buyerName: string;

  @ApiProperty({
    description: 'Documento de identidad o NIT del comprador',
    example: 'CC 1098765432',
  })
  buyerDocument: string;

  @ApiProperty({
    description: 'Fecha en que se efectuó la venta',
    example: '2026-09-14T00:00:00.000Z',
  })
  saleDate: Date;

  @ApiProperty({
    description: 'Motivo o justificación de la venta / desincorporación',
    example: 'Renovación de equipos tecnológicos por ciclo de vida',
  })
  saleReason: string;

  @ApiProperty({
    description: 'Monto total de la venta (suma de precios de los bienes)',
    example: 1900.0,
  })
  totalAmount: number;

  @ApiProperty({
    description: 'Listado de bienes incluidos en esta transacción de venta',
    type: [SaleItemResponseDto],
  })
  items: SaleItemResponseDto[];

  @ApiProperty({
    description: 'Fecha y hora de registro de la transacción',
    example: '2026-09-14T12:00:00.000Z',
  })
  createdAt: Date;
}

export class SaleResponseMapper {
  public static itemFromDomain(entity: SaleItemEntity): SaleItemResponseDto {
    return {
      id: entity.id,
      assetId: entity.assetId,
      assetName: entity.assetName,
      salePrice: entity.salePrice,
    };
  }

  public static fromDomain(entity: SaleEntity): SaleResponseDto {
    return {
      id: entity.id,
      buyerName: entity.buyerName,
      buyerDocument: entity.buyerDocument,
      saleDate: entity.saleDate,
      saleReason: entity.saleReason,
      totalAmount: entity.totalAmount,
      items: entity.items.map(SaleResponseMapper.itemFromDomain),
      createdAt: entity.createdAt,
    };
  }
}
